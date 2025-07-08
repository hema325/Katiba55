using AutoMapper.QueryableExtensions;
using Katiba55.API.Data;
using Katiba55.API.Dtos.ProjectProgress;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Katiba55.API.Controllers
{
    [Route("api/projects/{projectId}/progresses")]
    public class ProjectProgresses : BaseController
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public ProjectProgresses(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateAsync(int projectId, CreateProjectProgressDto dto)
        {
            var progress = _mapper.Map<ProjectProgress>(dto);
            progress.ProjectId = projectId;

            _context.ProjectProgresses.Add(progress);
            await _context.SaveChangesAsync();

            return Response(ResultFactory.Ok(progress.Id));
        }

        [HttpPut("{progressId}/update")]
        public async Task<IActionResult> UpdateAsync(int projectId, int progressId, UpdateProjectProgressDto dto)
        {
            var progress = await _context.ProjectProgresses.FirstOrDefaultAsync(p => p.Id == progressId && p.ProjectId == projectId);

            if (progress == null)
                return Response(ResultFactory.NotFound());

            _mapper.Map(dto, progress);

            _context.ProjectProgresses.Update(progress);
            await _context.SaveChangesAsync();

            return Response(ResultFactory.NoContent());
        }

        [HttpDelete("{progressId}/delete")]
        public async Task<IActionResult> DeleteAsync(int projectId, int progressId)
        {
            var progress = await _context.ProjectProgresses.FirstOrDefaultAsync(p => p.Id == progressId && p.ProjectId == projectId);

            if (progress == null)
                return Response(ResultFactory.NotFound());

            _context.ProjectProgresses.Remove(progress);
            await _context.SaveChangesAsync();

            return Response(ResultFactory.NoContent());
        }

        [HttpGet("{progressId}/getById")]
        public async Task<IActionResult> GetByIdAsync(int projectId, int progressId)
        {
            var progress = await _context.ProjectProgresses
                .Where(p => p.Id == progressId && p.ProjectId == projectId)
                .ProjectTo<ProjectProgressDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync();

            if (progress == null)
                return Response(ResultFactory.NotFound());

            return Response(ResultFactory.Ok(progress));
        }

        [HttpGet("getAll")]
        public async Task<IActionResult> GetAllAsync(int projectId)
        {
            var progress = await _context.ProjectProgresses
                .Where(p => p.ProjectId == projectId)
                .ProjectTo<ProjectProgressDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

            if (progress == null)
                return Response(ResultFactory.NotFound());

            return Response(ResultFactory.Ok(progress));
        }
    }
}
