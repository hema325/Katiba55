using AutoMapper.QueryableExtensions;
using Katiba55.API.Data;
using Katiba55.API.Dtos.Projects;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Katiba55.API.Controllers
{
    [Route("api/projects")]
    public class ProjectsController : BaseController
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public ProjectsController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateAsync(CreateProjectDto dto)
        {
            if(await _context.Projects.AnyAsync(p => p.Name == dto.Name))
                return Response(ResultFactory.Conflict("الاسم المدخل موجود مسبقًا. يرجى اختيار اسم آخر"));

            var project = _mapper.Map<Project>(dto);

            if (project.ExecutionPercent != null && project.ExecutionDate != null)
            {
                project.ExecutionHistories =
                [
                    new ProjectExecutionHistory
                    {
                        Percentage = project.ExecutionPercent.Value,
                        Date =  project.ExecutionDate.Value
                    }
                ];
            }

            _context.Projects.Add(project);
            await _context.SaveChangesAsync();

            return Response(ResultFactory.Ok(project.Id));
        }

        [HttpPut("{id}/update")]
        public async Task<IActionResult> UpdateAsync(int id, UpdateProjectDto dto)
        {
            var project = await _context.Projects.FindAsync(id);

            if (project == null)
                return Response(ResultFactory.NotFound());

            if (await _context.Projects.AnyAsync(p => p.Id != id && p.Name == dto.Name))
                return Response(ResultFactory.Conflict("الاسم المدخل موجود مسبقًا. يرجى اختيار اسم آخر"));

            if((dto.ExecutionDate != null && dto.ExecutionPercent != null) && (dto.ExecutionDate != project.ExecutionDate || dto.ExecutionPercent != project.ExecutionPercent))
            {
                project.ExecutionHistories =
                [
                    new ProjectExecutionHistory
                    {
                        Percentage = dto.ExecutionPercent.Value,
                        Date =  dto.ExecutionDate.Value
                    }
                ];
            }

            _mapper.Map(dto, project);

            _context.Projects.Update(project);
            await _context.SaveChangesAsync();

            return Response(ResultFactory.Ok());
        }

        [HttpDelete("{id}/delete")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var project = await _context.Projects.FindAsync(id);

            if (project == null)
                return Response(ResultFactory.NotFound());

            var mediaPaths = await _context.Medias
                    .Where(m => m.ProjectId == id)
                    .Select(m => m.Path)
                    .ToListAsync();

            foreach (var path in mediaPaths)
            {
                try
                {
                    if (System.IO.File.Exists(path))
                        System.IO.File.Delete(path);
                }
                catch
                {

                }
            }

            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();

            return Response(ResultFactory.Ok());
        }

        [HttpGet("{id}/getById")]
        public async Task<IActionResult> GetByIdAsync(int id)
        {
            var project = await _context.Projects
                .ProjectTo<ProjectDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(p => p.Id == id);

            if(project == null)
                return Response(ResultFactory.NotFound());

            return Response(ResultFactory.Ok(project));
        }

        [HttpGet("{id}/getBriefById")]
        public async Task<IActionResult> GetBriefByIdAsync(int id)
        {
            var project = await _context.Projects
                .ProjectTo<ProjectBriefDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(p => p.Id == id);

            if(project == null)
                return Response(ResultFactory.NotFound());

            return Response(ResultFactory.Ok(project));
        }

        [HttpGet("{id}/getDetailedById")]
        public async Task<IActionResult> GetDetailedByIdAsync(int id)
        {
            var project = await _context.Projects
                .ProjectTo<ProjectDetailedDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(p => p.Id == id);

            if(project == null)
                return Response(ResultFactory.NotFound());

            return Response(ResultFactory.Ok(project));
        }

        [HttpGet("getAll")]
        public async Task<IActionResult> GetAllAsync()
        {
            var projects = await _context.Projects
                .ProjectTo<ProjectBriefDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

            return Response(ResultFactory.Ok(projects));
        }

        [HttpGet("{id}/executionHistories")]
        public async Task<IActionResult> GetExecutionHistoriesAsync(int id)
        {
            var histories = await _context.ProjectExecutionHistories
                .Where(h => h.ProjectId == id)
                .OrderBy(h => h.Date)
                .ProjectTo<ProjectExecutionHistoryDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

            return Response(ResultFactory.Ok(histories));
        }
    }
}
