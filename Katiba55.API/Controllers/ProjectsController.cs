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

            if(dto.ExecutionPercent != null && dto.ExecutionDate != null)
            {
                project.ExecutionHistories =
                [
                    new ProjectExecutionHistory
                    {
                        Percentage = dto.ExecutionPercent!.Value,
                        Date =  dto.ExecutionDate!.Value
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

            if ((dto.ExecutionPercent != null && dto.ExecutionPercent != project.ExecutionPercent) || (dto.ExecutionDate != null && dto.ExecutionDate != project.ExecutionDate))
            {
                project.ExecutionHistories =
                [
                    new ProjectExecutionHistory
                    {
                        Percentage = dto.ExecutionPercent!.Value,
                        Date =  dto.ExecutionDate!.Value
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

        [HttpGet("{id}/monthlyTimelineProgress")]
        public async Task<IActionResult> GetMonthlyTimelineProgressAsync(int id)
        {
            // get timeline data
            var progress = await _context.ProjectExecutionHistories
                .Where(h => h.ProjectId == id)
                .GroupBy(h => new { h.Date.Year, h.Date.Month })
                .Select(g => new ProjectMonthlyProgressItem
                {
                    Year = g.Key.Year,
                    Month = g.Key.Month,
                    Percentage = g.Max(h => h.Percentage)
                })
                .OrderBy(p => p.Year)
                .ThenBy(p => p.Month)
                .ToListAsync();

            if (!progress.Any())
            {
                return Response(ResultFactory.Ok(Enumerable.Empty<ProjectMonthlyProgressItem>()));
            }

            // get all dates between first and last progress
            var startDate = new DateTime(progress.First().Year, progress.First().Month, 1);
            var endDate = new DateTime(progress.Last().Year, progress.Last().Month, 1);

            var progressDates = new List<DateTime>();
            for(var current = startDate.AddMonths(-1); current <= endDate; current = current.AddMonths(1))
            {
                progressDates.Add(current);
            }

            // fill all progress gaps with last progress
            var progressDic = progress.ToDictionary(s => new DateTime(s.Year, s.Month, 1));
            var progressFilled = new List<ProjectMonthlyProgressItem>();
            var lastPercent = 0m;
            foreach (var date in progressDates) { 
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
            // get timeline data
            var progress = await _context.ProjectExecutionHistories
                .GroupBy(h => new { h.ProjectId, h.Date.Year, h.Date.Month })
                .Select(g => new FlatProjectMonthlyProgress
                {
                    Year = g.Key.Year,
                    Month = g.Key.Month,
                    Percentage = g.Max(h => h.Percentage),
                    ProjectName = g.First().Project.Name,

                })
                .OrderBy(h => h.Year)
                .ThenBy(h => h.Month)
                .ToListAsync();

            if (!progress.Any())
            {
                return Response(ResultFactory.Ok(Enumerable.Empty<ProjectMonthlyProgressList>()));
            }

            // get all dates between first and last progress
            var startDate = new DateTime(progress.First().Year, progress.First().Month, 1);
            var endDate = new DateTime(progress.Last().Year, progress.Last().Month, 1);

            var progressDates = new List<DateTime>();
            for(var current = startDate.AddMonths(-1); current <= endDate; current = current.AddMonths(1))
            {
                progressDates.Add(current);
            }

            var projectsList = new List<ProjectMonthlyProgressList>();
            var projectNames = progress.Select(p => p.ProjectName).Distinct().ToList();
            foreach(var projectName in projectNames)
            {
                // fill all progress gaps with last progress
                var progressDic = progress.Where(p => p.ProjectName == projectName)
                    .ToDictionary(s => new DateTime(s.Year, s.Month, 1), p => new ProjectMonthlyProgressItem
                    {
                        Year = p.Year,
                        Month = p.Month,
                        Percentage = p.Percentage
                    });

                var progressFilled = new List<ProjectMonthlyProgressItem>();
                var lastPercent = 0m;
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

                projectsList.Add(new() { ProjectName = projectName, Items = progressFilled });
            }
            
            return Response(ResultFactory.Ok(projectsList));
        }
    }
}
