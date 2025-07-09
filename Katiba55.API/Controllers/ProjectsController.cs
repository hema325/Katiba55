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

            _mapper.Map(dto, project);

            _context.Projects.Update(project);
            await _context.SaveChangesAsync();

            return Response(ResultFactory.NoContent());
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

            return Response(ResultFactory.NoContent());
        }

        [HttpGet("{id}/detailed")]
        public async Task<IActionResult> GetDetailedAsync(int id)
        {
            var project = await _context.Projects
                .ProjectTo<ProjectDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(p => p.Id == id);

            if(project == null)
                return Response(ResultFactory.NotFound());

            return Response(ResultFactory.Ok(project));
        }

        [HttpGet("brief")]
        public async Task<IActionResult> GetAllBriefAsync()
        {
            var projects = await _context.Projects
                .ProjectTo<ProjectBriefDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

            return Response(ResultFactory.Ok(projects));
        }

        [HttpGet("detailed")]
        public async Task<IActionResult> GetAllDetailedAsync()
        {
            var projects = await _context.Projects
                .ProjectTo<ProjectDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

            return Response(ResultFactory.Ok(projects));
        }
    }
}
