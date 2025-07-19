using AutoMapper.QueryableExtensions;
using Katiba55.API.Data;
using Katiba55.API.Dtos.Projects;
using Katiba55.API.Dtos.Works;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Katiba55.API.Controllers
{
    [Route("api/works")]
    public class WorksController : BaseController
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public WorksController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateAsync(CreateWorkDto dto)
        {
            var work = _mapper.Map<Work>(dto);

            if (work.ExecutionPercent != null && work.ExecutionDate != null)
            {
                work.ExecutionHistories =
                [
                    new WorkExecutionHistory
                    {
                        Percentage = work.ExecutionPercent.Value,
                        Date =  work.ExecutionDate.Value
                    }
                ];
            }

            _context.Works.Add(work);
            await _context.SaveChangesAsync();

            return Response(ResultFactory.Ok(work.Id));
        }

        [HttpPut("{id}/update")]
        public async Task<IActionResult> UpdateAsync(int id, UpdateWorkDto dto)
        {
            var work = await _context.Works.FindAsync(id);

            if (work == null)
                return Response(ResultFactory.NotFound());

            if ((dto.ExecutionDate != null && dto.ExecutionPercent != null) && (dto.ExecutionDate != work.ExecutionDate || dto.ExecutionPercent != work.ExecutionPercent))
            {
                work.ExecutionHistories =
                [
                    new WorkExecutionHistory
                    {
                        Percentage = dto.ExecutionPercent.Value,
                        Date =  dto.ExecutionDate.Value
                    }
                ];
            }

            _mapper.Map(dto, work);

            _context.Works.Update(work);
            await _context.SaveChangesAsync();

            return Response(ResultFactory.Ok());
        }

        [HttpDelete("{id}/delete")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var work = await _context.Works.FindAsync(id);

            if (work == null)
                return Response(ResultFactory.NotFound());

            _context.Works.Remove(work);
            await _context.SaveChangesAsync();

            return Response(ResultFactory.Ok());
        }

        [HttpGet("{id}/getById")]
        public async Task<IActionResult> GetByIdAsync(int id)
        {
            if (await _context.WorkItems.AnyAsync(wi => wi.WorkId == id))
                return Response(ResultFactory.Conflict("تعذّر حذف هذا العمل لأنه يحتوي على بنود مرتبطة.\r\n"));

            var work = await _context.Works
                .ProjectTo<WorkDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(w => w.Id == id);

            if (work == null)
                return Response(ResultFactory.NotFound());

            return Response(ResultFactory.Ok(work));
        }

        [HttpGet("GetByProjectId")]
        public async Task<IActionResult> GetByProjectIdAsync([FromQuery] int projectId)
        {
            var works = await _context.Works
                .Where(w => w.ProjectId == projectId)
                .ProjectTo<WorkDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

            return Response(ResultFactory.Ok(works));
        }

        [HttpGet("{id}/monthlyTimelineProgress")]
        public async Task<IActionResult> GetMonthlyTimelineProgressAsync(int id)
        {
            var progress = await _context.WorkExecutionHistories
                .Where(h => h.WorkId == id)
                .GroupBy(h => new { h.Date.Year, h.Date.Month })
                .Select(g => new WorkMonthlyProgressItem
                {
                    Year = g.Key.Year,
                    Month = g.Key.Month,
                    Percentage = g.Max(h => h.Percentage)
                })
                .OrderBy(p=>p.Year)
                .ThenBy(p=>p.Month)
                .ToListAsync();

            if (!progress.Any())
            {
                return Response(ResultFactory.Ok(Enumerable.Empty<WorkMonthlyProgressItem>()));
            }

            var startDate = new DateTime(progress.First().Year, progress.First().Month, 1);
            var endDate = new DateTime(progress.Last().Year, progress.Last().Month, 1);

            var progressDates = new List<DateTime>();
            for(var current = startDate; current <= endDate; current = current.AddMonths(1))
            {
                progressDates.Add(current);
            }

            var progressDic = progress.ToDictionary(s => new DateTime(s.Year, s.Month, 1));
            var progressFilled = new List<WorkMonthlyProgressItem>();
            var lastPercent = 0d;

            foreach (var date in progressDates)
            {
                if(progressDic.TryGetValue(date, out var prog))
                {
                    progressFilled.Add(prog);
                    lastPercent = prog.Percentage;
                }
                else
                {
                    progressFilled.Add(new()
                    {
                        Year = date.Year,
                        Month = date.Month,
                        Percentage = lastPercent
                    });
                }
            }

            return Response(ResultFactory.Ok(progressFilled));
        }
        
        
        [HttpGet("monthlyTimelineProgress")]
        public async Task<IActionResult> GetMonthlyTimelineProgressAsync()
        {
            var progress = await _context.WorkExecutionHistories
                .GroupBy(h => new { h.WorkId, h.Date.Year, h.Date.Month })
                .Select(g => new FlatWorkMonthlyProgress
                {
                    Year = g.Key.Year,
                    Month = g.Key.Month,
                    Percentage = g.Max(h => h.Percentage),
                    WorkName = g.First().Work.Name
                })
                .OrderBy(p=>p.Year)
                .ThenBy(p=>p.Month)
                .ToListAsync();

            if (!progress.Any())
            {
                return Response(ResultFactory.Ok(Enumerable.Empty<WorkMonthlyProgressList>()));
            }

            var startDate = new DateTime(progress.First().Year, progress.First().Month, 1);
            var endDate = new DateTime(progress.Last().Year, progress.Last().Month, 1);

            var progressDates = new List<DateTime>();
            for(var current = startDate; current <= endDate; current = current.AddMonths(1))
            {
                progressDates.Add(current);
            }

            var worksList = new List<WorkMonthlyProgressList>();
            var workNames = progress.Select(w => w.WorkName).Distinct().ToList();
            foreach(var workName in workNames)
            {
                var progressDic = progress
                    .Where(w=>w.WorkName == workName)
                    .ToDictionary(s => new DateTime(s.Year, s.Month, 1), p => new WorkMonthlyProgressItem
                    {
                        Year = p.Year,
                        Month = p.Month,
                        Percentage = p.Percentage
                    });

                var progressFilled = new List<WorkMonthlyProgressItem>();
                var lastPercent = 0d;
                foreach (var date in progressDates)
                {
                    if (progressDic.TryGetValue(date, out var prog))
                    {
                        progressFilled.Add(prog);
                        lastPercent = prog.Percentage;
                    }
                    else
                    {
                        progressFilled.Add(new()
                        {
                            Year = date.Year,
                            Month = date.Month,
                            Percentage = lastPercent
                        });
                    }
                }

                worksList.Add(new() { WorkName = workName, Items = progressFilled });
            }

            return Response(ResultFactory.Ok(worksList));
        }
    }
}
