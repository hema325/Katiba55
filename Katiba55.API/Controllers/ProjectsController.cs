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

            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();

            return Response(ResultFactory.NoContent());
        }

        [HttpGet("{id}/getById")]
        public async Task<IActionResult> GetbyIdAsync(int id)
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

        [HttpGet("paginate")]
        public async Task<IActionResult> PaginateAsync([FromQuery] ProjectsFilterDto dto)
        {
            var query = _context.Projects.AsQueryable();

            if (!string.IsNullOrEmpty(dto.Name))
                query = query.Where(p => p.Name.Contains(dto.Name));

            if (dto.Status != null)
                query = query.Where(p => p.Status == dto.Status);

            if(dto.SupervisorId != null)
                query = query.Where(p => p.SupervisorId == dto.SupervisorId);

            if (dto.CompaniesId != null && dto.CompaniesId.Any())
                query = query.Where(p => p.ProjectCompanies.Any(pc => dto.CompaniesId.Contains(pc.CompanyId)));

            if (dto.FromDate != null)
                query = query.Where(p => p.StartDate >= dto.FromDate);

            if(dto.ToDate != null)
                query = query.Where(p => p.StartDate <= dto.ToDate);

            var projects = await query
                .ProjectTo<ProjectListDto>(_mapper.ConfigurationProvider)
                .PaginateAsync(dto.PageNumber, dto.PageSize);

            return Response(ResultFactory.Ok(projects));
        }
    }
}
