using AutoMapper.QueryableExtensions;
using Katiba55.API.Data;
using Katiba55.API.Dtos.WorkItems;
using Katiba55.API.Services.ProgressUpdater;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Katiba55.API.Controllers
{
    [Route("api/workItems")]
    public class WorkItemsController : BaseController
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly IProgressUpdaterService _progressUpdater;

        public WorkItemsController(ApplicationDbContext context, IMapper mapper, IProgressUpdaterService progressUpdater)
        {
            _context = context;
            _mapper = mapper;
            _progressUpdater = progressUpdater;
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateAsync(CreateWorkItemDto dto)
        {
            if (await _context.WorkItems.AnyAsync(wi => wi.WorkId == dto.WorkId && wi.ItemId == dto.ItemId))
                return Response(ResultFactory.Conflict("هذا البند موجود بالفعل."));

            var workItem = _mapper.Map<WorkItem>(dto);

            _context.WorkItems.Add(workItem);
            await _context.SaveChangesAsync();

            await _progressUpdater.UpdateWorkItemAsync(workItem.Id);
            await _progressUpdater.UpdateWorkAsync(workItem.WorkId);
            await _progressUpdater.UpdateProjectAsync(workItem.WorkId);

            return Response(ResultFactory.Ok(workItem.Id));
        }

        [HttpPut("{id}/update")]
        public async Task<IActionResult> UpdateAsync(int id, UpdateWorkItemDto dto)
        {
            var workItem = await _context.WorkItems.FindAsync(id);

            if (workItem == null)
                return Response(ResultFactory.NotFound());

            var updateProgress = workItem.TotalValue != dto.TotalValue || workItem.ExecutedValue != dto.ExecutedValue;

            _mapper.Map(dto, workItem);

            _context.WorkItems.Update(workItem);
            await _context.SaveChangesAsync();

            if(updateProgress)
            {
                await _progressUpdater.UpdateWorkItemAsync(workItem.Id);
                await _progressUpdater.UpdateWorkAsync(workItem.WorkId);
                await _progressUpdater.UpdateProjectAsync(workItem.WorkId);
            }

            return Response(ResultFactory.Ok());
        }

        [HttpDelete("{id}/delete")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var workItem = await _context.WorkItems.FindAsync(id);

            if (workItem == null)
                return Response(ResultFactory.NotFound());

            _context.WorkItems.Remove(workItem);
            await _context.SaveChangesAsync();

            await _progressUpdater.UpdateWorkAsync(workItem.WorkId);
            await _progressUpdater.UpdateProjectAsync(workItem.WorkId);

            return Response(ResultFactory.Ok());
        }

        [HttpGet("{id}/getById")]
        public async Task<IActionResult> GetByIdAsync(int id)
        {
            var workItem = await _context.WorkItems
                .ProjectTo<WorkItemDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(wi => wi.Id == id);

            if (workItem == null)
                return Response(ResultFactory.NotFound());

            return Response(ResultFactory.Ok(workItem));
        }

        [HttpGet("getByWorkId")]
        public async Task<IActionResult> GetByWorkIdAsync([FromQuery] int workId)
        {
            var workItem = await _context.WorkItems
                .Where(w => w.WorkId == workId)
                .ProjectTo<WorkItemDetailedDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

            if (workItem == null)
                return Response(ResultFactory.NotFound());

            return Response(ResultFactory.Ok(workItem));
        }
    }
}
