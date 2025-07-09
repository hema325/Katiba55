using AutoMapper.QueryableExtensions;
using Katiba55.API.Data;
using Katiba55.API.Dtos.Projects;
using Katiba55.API.Dtos.WorkItems;
using Katiba55.API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Katiba55.API.Controllers
{
    [Route("api/workItems")]
    public class WorkItemsController : BaseController
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public WorkItemsController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateAsync(CreateWorkItemDto dto)
        {
            if (await _context.WorkItems.AnyAsync(wi => wi.WorkId == dto.WorkId && wi.ItemId == dto.ItemId))
                return Response(ResultFactory.Conflict("هذا البند موجود بالفعل."));

                var workItem = _mapper.Map<WorkItem>(dto);

            if (workItem.ExecutionPercent != null && workItem.ExecutionDate != null)
            {
                workItem.ExecutionHistories =
                [
                    new WorkItemExecutionHistory
                    {
                        Percentage = workItem.ExecutionPercent.Value,
                        Date =  workItem.ExecutionDate.Value
                    }
                ];
            }

            _context.WorkItems.Add(workItem);
            await _context.SaveChangesAsync();

            return Response(ResultFactory.Ok(workItem.Id));
        }

        [HttpPut("{id}/update")]
        public async Task<IActionResult> UpdateAsync(int id, UpdateWorkItemDto dto)
        {
            var workItem = await _context.WorkItems.FindAsync(id);

            if(workItem == null)
                return Response(ResultFactory.NotFound());

            if ((dto.ExecutionDate != null && dto.ExecutionPercent != null) && (dto.ExecutionDate != workItem.ExecutionDate || dto.ExecutionPercent != workItem.ExecutionPercent))
            {
                workItem.ExecutionHistories =
                [
                    new WorkItemExecutionHistory
                    {
                        Percentage = dto.ExecutionPercent.Value,
                        Date =  dto.ExecutionDate.Value
                    }
                ];
            }

            _mapper.Map(dto, workItem);

            _context.WorkItems.Update(workItem);
            await _context.SaveChangesAsync();

            return Response(ResultFactory.NoContent());
        }

        [HttpDelete("{id}/delete")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var workItem = await _context.WorkItems.FindAsync(id);

            if (workItem == null)
                return Response(ResultFactory.NotFound());

            _context.WorkItems.Remove(workItem);
            await _context.SaveChangesAsync();

            return Response(ResultFactory.NoContent());
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

        [HttpGet("{id}/executionHistories")]
        public async Task<IActionResult> GetExecutionHistoriesAsync(int id)
        {
            var histories = await _context.WorkItemExecutionHistories
                .Where(h => h.WorkItemId == id)
                .OrderBy(h => h.Date)
                .ProjectTo<WorkItemExecutionHistoryDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

            return Response(ResultFactory.Ok(histories));
        }
    }
}
