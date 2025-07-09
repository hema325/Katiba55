using AutoMapper.QueryableExtensions;
using Katiba55.API.Data;
using Katiba55.API.Dtos.Projects;
using Katiba55.API.Dtos.WorkItems;
using Katiba55.API.Dtos.Works;
using Katiba55.API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Katiba55.API.Controllers
{
    [Route("api/works")]
    public class WorksController: BaseController
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

            return Response(ResultFactory.NoContent());
        }

        [HttpDelete("{id}/delete")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var work = await _context.Works.FindAsync(id);

            if (work == null)
                return Response(ResultFactory.NotFound());

            _context.Works.Remove(work);
            await _context.SaveChangesAsync();

            return Response(ResultFactory.NoContent());
        }

        [HttpGet("{id}/getById")]
        public async Task<IActionResult> GetByIdAsync(int id)
        {
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

        [HttpGet("{id}/executionHistories")]
        public async Task<IActionResult> GetExecutionHistoriesAsync(int id)
        {
            var histories = await _context.WorkExecutionHistories
                .Where(h => h.WorkId == id)
                .OrderBy(h=>h.Date)
                .ProjectTo<WorkExecutionHistoryDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

            return Response(ResultFactory.Ok(histories));
        }
    }
}
