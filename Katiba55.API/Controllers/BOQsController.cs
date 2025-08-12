using AutoMapper.QueryableExtensions;
using Katiba55.API.Data;
using Katiba55.API.Dtos.BOQs;
using Katiba55.API.Dtos.Projects;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Katiba55.API.Controllers
{
    [Route("api/boqs")]
    public class BOQsController : BaseController
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public BOQsController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateAsync(CreateBOQDto dto)
        {
            var boq = _mapper.Map<BOQ>(dto);

            if(boq.WorkId != null)
            {
                boq.ProjectId = await _context.Works.Where(w => w.Id == dto.WorkId).Select(w => w.ProjectId).FirstOrDefaultAsync();
            }

            _context.BOQs.Add(boq);
            await _context.SaveChangesAsync();

            return Response(ResultFactory.Ok(boq.Id));
        }

        [HttpPut("{id}/edit")]
        public async Task<IActionResult> UpdateAsync(int id, UpdateBOQDto dto)
        {
            var boq = await _context.BOQs.FindAsync(id);

            if(boq == null)
                return Response(ResultFactory.NotFound());

            _mapper.Map(dto, boq);

            _context.BOQs.Update(boq);
            await _context.SaveChangesAsync();

            return Response(ResultFactory.Ok());
        }

        [HttpDelete("{id}/delete")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var boq = await _context.BOQs.FindAsync(id);

            if (boq == null)
                return Response(ResultFactory.NotFound());

            _context.BOQs.Remove(boq);
            await _context.SaveChangesAsync();

            return Response(ResultFactory.Ok());
        }

        [HttpGet("{id}/getById")]
        public async Task<IActionResult> GetByIdAsync(int id)
        {
            var boq = await _context.BOQs
                .ProjectTo<BOQDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(b=>b.Id == id);

            if (boq == null)
                return Response(ResultFactory.NotFound());

            return Response(ResultFactory.Ok(boq));
        }

        [HttpGet("getByWorkId")]
        public async Task<IActionResult> GetByWorkIdAsync([FromQuery] int workId)
        {
            var boq = await _context.BOQs
                .Where(boq => boq.WorkId == workId)
                .ProjectTo<BOQDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

            return Response(ResultFactory.Ok(boq));
        }

        [HttpGet("getByProjectId")]
        public async Task<IActionResult> GetByProjectIdAsync([FromQuery] int projectId)
        {
            var boq = await _context.BOQs
                .Where(boq => boq.ProjectId == projectId)
                .ProjectTo<BOQDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

            return Response(ResultFactory.Ok(boq));
        }

        [HttpGet("getByDetailedWorkId")]
        public async Task<IActionResult> GetDetailedByWorkIdAsync([FromQuery] int workId)
        {
            var boq = await _context.BOQs
                .Where(boq => boq.WorkId == workId)
                .ProjectTo<BOQDetailedDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

            return Response(ResultFactory.Ok(boq));
        }

        [HttpGet("getDetailedByCompanyId")]
        public async Task<IActionResult> GetDetailedByCompanyIdAsync([FromQuery] int? companyId = null)
        {
            if(companyId != null)
            {
                var projects = await _context.Projects
                    .Include(p => p.BOQs.Where(boq => boq.CompanyId == companyId))
                    .ThenInclude(boq=>boq.Company)
                    .Include(p => p.BOQs.Where(boq => boq.CompanyId == companyId))
                    .ThenInclude(boq => boq.Contract)
                    .ThenInclude(c => c.Invoices)
                    .Where(p => p.BOQs.Any(boq => boq.CompanyId == companyId))
                    .ToListAsync();

                return Response(ResultFactory.Ok(_mapper.Map<ProjectWithBOQDto[]>(projects)));
            }
            else
            {
                var projects = await _context.Projects
                        .Include(p => p.BOQs)
                        .ThenInclude(boq => boq.Company)
                        .Include(p => p.BOQs)
                        .ThenInclude(boq => boq.Contract)
                        .ThenInclude(c => c.Invoices)
                        .ToListAsync();

                return Response(ResultFactory.Ok(_mapper.Map<ProjectWithBOQDto[]>(projects)));
            }
        }
    }
}
