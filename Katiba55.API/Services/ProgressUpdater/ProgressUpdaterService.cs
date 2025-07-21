using Katiba55.API.Data;
using Katiba55.API.Entities;
using Microsoft.EntityFrameworkCore;

namespace Katiba55.API.Services.ProgressUpdater
{
    public class ProgressUpdaterService: IProgressUpdaterService
    {
        private readonly ApplicationDbContext _context;

        public ProgressUpdaterService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task UpdateWorkItemsAsync(int workId)
        {
            var work = await _context.Works
                .Include(w=>w.WorkItems)
                .FirstOrDefaultAsync(w=>w.Id ==  workId);

            if (work == null)
                throw new NullReferenceException(nameof(work));

            foreach(var workItem in work.WorkItems)
            {
                workItem!.RelativeWeight = SafeDivide(workItem.TotalValue, work!.TotalContractValue);
                workItem.ExecutionPercent = SafeDivide(workItem.ExecutedValue, workItem.TotalValue) * 100;
                workItem.ExecutionDate = DateTime.Now;
                workItem.RelativeExecutionPercent = workItem.RelativeWeight * workItem.ExecutionPercent;
            }

            await _context.SaveChangesAsync();
        }

        public async Task UpdateWorkItemAsync(int workItemId)
        {
            var workItem = await _context.WorkItems
                .Include(wi => wi.Work)
                .FirstOrDefaultAsync(wi => wi.Id == workItemId);

            if (workItem == null)
                throw new NullReferenceException(nameof(workItem));

            workItem!.RelativeWeight = SafeDivide(workItem.TotalValue, workItem.Work!.TotalContractValue);
            workItem.ExecutionPercent = SafeDivide(workItem.ExecutedValue, workItem.TotalValue) * 100;
            workItem.ExecutionDate = DateTime.Now;
            workItem.RelativeExecutionPercent = workItem.RelativeWeight * workItem.ExecutionPercent;

            await _context.SaveChangesAsync();
        }

        public async Task UpdateWorkAsync(int workId)
        {
            var work = await _context.Works.FindAsync(workId);

            if (work == null)
                throw new NullReferenceException(nameof(work));

            work!.ExecutionPercent = await _context.WorkItems.SumAsync(wi => wi.RelativeExecutionPercent) * 100;
            work.ExecutionDate = DateTime.Now;
            work.ExecutionHistories =
            [
                new WorkExecutionHistory
                {
                    Percentage = work.ExecutionPercent!.Value,
                    Date =  DateTime.Now
                }
            ];

            await _context.SaveChangesAsync();
        }

        public async Task UpdateProjectAsync(int workId)
        {
            var project = await _context.Projects.FirstOrDefaultAsync(p => p.Works.Any(w => w.Id == workId));

            if (project == null)
                throw new InvalidOperationException(nameof(project));

            // update project
            var totalExecutionPercent = await _context.Works.SumAsync(w => w.ExecutionPercent);
            var totalWorksCount = await _context.Works.Where(w => w.ProjectId == project.Id).CountAsync();
            project.ExecutionPercent = SafeDivide(totalExecutionPercent.Value, totalWorksCount) * 100;
            project.ExecutionDate = DateTime.Now;
            project.ExecutionHistories =
            [
                new ProjectExecutionHistory
                {
                    Percentage = project.ExecutionPercent.Value,
                    Date =  DateTime.Now
                }
            ];

            await _context.SaveChangesAsync();
        }

        private decimal SafeDivide(decimal first, decimal second)
        {
            if (second == 0)
                return 0;

            return first / second;
        }
    }

}
