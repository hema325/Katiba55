﻿using AutoMapper.QueryableExtensions;
using Katiba55.API.Data;
using Katiba55.API.Dtos.Items;
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

            if (dto.ExecutionPercent != null && dto.ExecutionDate != null)
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

            if ((dto.ExecutionPercent != null && dto.ExecutionPercent != work.ExecutionPercent) || (dto.ExecutionDate != null && dto.ExecutionDate != work.ExecutionDate))
            {
                work.ExecutionHistories =
                [
                    new WorkExecutionHistory
                    {
                        Percentage = dto.ExecutionPercent!.Value,
                        Date =  dto.ExecutionDate!.Value
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
            var work = await _context.Works
                .ProjectTo<WorkDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(w => w.Id == id);

            if (work == null)
                return Response(ResultFactory.NotFound());

            return Response(ResultFactory.Ok(work));
        }

        [HttpGet("{id}/getDetailedById")]
        public async Task<IActionResult> GetDetailedByIdAsync(int id)
        {
            var work = await _context.Works
                .ProjectTo<WorkDetailedDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(w => w.Id == id);

            if (work == null)
                return Response(ResultFactory.NotFound());

            return Response(ResultFactory.Ok(work));
        }

        [HttpGet("getBriefByProjectId")]
        public async Task<IActionResult> GetBriefByProjectIdAsync([FromQuery] int projectId)
        {
            var works = await _context.Works
                .Where(w => w.ProjectId == projectId)
                .ProjectTo<WorkBriefDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

            return Response(ResultFactory.Ok(works));
        }

        [HttpGet("getDetailedByProjectId")]
        public async Task<IActionResult> GetDetailedByProjectIdAsync([FromQuery] int projectId)
        {
            var works = await _context.Works
                .Where(w => w.ProjectId == projectId)
                .ProjectTo<WorkDetailedDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

            return Response(ResultFactory.Ok(works));
        }

        [HttpGet("getDetailedWithBOQByProjectId")]
        public async Task<IActionResult> GetDetailedWithBOQByProjectIdAsync([FromQuery] int projectId)
        {
            var works = await _context.Works
                .Where(w => w.ProjectId == projectId)
                .ProjectTo<WorkWithDetailedBOQDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

            return Response(ResultFactory.Ok(works));
        }

        [HttpGet("reportByProjectId")]
        public async Task<IActionResult> GetReportByProjectIdAsync([FromQuery] int projectId)
        {
            var query = _context.Works
                .Where(w => w.ProjectId == projectId)
                .AsQueryable();

            var report = new WorksReportDto
            {
                TotalWorks = await query.CountAsync(),
                PendingWorks = await query.Where(p => p.ExecutionStatus == ExecutionStatus.Pending).CountAsync(),
                OnHoldWorks = await query.Where(p => p.ExecutionStatus == ExecutionStatus.OnHold).CountAsync(),
                UnderconstructionWorks = await query.Where(p => p.ExecutionStatus == ExecutionStatus.Underconstruction).CountAsync(),
                CompletedWorks = await query.Where(p => p.ExecutionStatus == ExecutionStatus.Completed).CountAsync(),
                CancelledWorks = await query.Where(p => p.ExecutionStatus == ExecutionStatus.Cancelled).CountAsync(),
                TotalExecutionPercent = await query.SumAsync(p => p.ExecutionPercent!.Value)
            };

            return Response(ResultFactory.Ok(report));
        }

        [HttpGet("getWorksExecutionSummaryByProjectId")] 
        public async Task<IActionResult> GetWorksExecutionSummaryByProjectIdAsync([FromQuery] int projectId)
        {
            var items = await _context.Items
                .Where(i => i.Work.ProjectId == projectId)
                .Select(i => i.Name)
                .Distinct()
                .ToListAsync();

            var works = await _context.Works
                .Where(w => w.ProjectId == projectId)
                .ProjectTo<WorkWithItemsBriefDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

            var result = new WorkExecutionSummary
            {
                Items = items,
                Works = works
            };

            return Response(ResultFactory.Ok(result));
        }

        [HttpGet("{id}/getMonthlyTimelineProgress")]
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
            for(var current = startDate.AddMonths(progress.First().Percentage != 0 ? -1 : 0); current <= endDate; current = current.AddMonths(1))
            {
                progressDates.Add(current);
            }

            var progressDic = progress.ToDictionary(s => new DateTime(s.Year, s.Month, 1));
            var progressFilled = new List<WorkMonthlyProgressItem>();
            var lastPercent = 0m;

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
        
        
        [HttpGet("getMonthlyTimelineProgressByProjectId")]
        public async Task<IActionResult> GetMonthlyTimelineProgressByProjectIdAsync([FromQuery] int projectId)
        {
            var progress = await _context.WorkExecutionHistories
                .Where(h=>h.Work.ProjectId == projectId)
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
            for(var current = startDate.AddMonths(progress.First().Percentage != 0 ? -1 : 0); current <= endDate; current = current.AddMonths(1))
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

                worksList.Add(new() { WorkName = workName, Items = progressFilled });
            }

            return Response(ResultFactory.Ok(worksList));
        }
    }
}
