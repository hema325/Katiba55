using AutoMapper.QueryableExtensions;
using Katiba55.API.Data;
using Katiba55.API.Dtos.WorkCompanies;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Katiba55.API.Controllers
{
    [Route("api/workCompanies")]
    public class WorkCompaniesController : BaseController
    {
        private ApplicationDbContext _context;
        private IMapper _mapper;

        public WorkCompaniesController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateAsync(CreateWorkCompanyDto dto)
        {
            if (await _context.WorkCompanies.AnyAsync(wc => wc.WorkId == dto.WorkId && wc.CompanyId == dto.CompanyId))
                return Response(ResultFactory.Conflict("هذة الشركة موجودة بالفعل."));

            var workCompany = _mapper.Map<WorkCompany>(dto);

            _context.WorkCompanies.Add(workCompany);
            await _context.SaveChangesAsync();

            return Response(ResultFactory.Ok(workCompany.Id));
        }

        [HttpPut("{id}/edit")]
        public async Task<IActionResult> UpdateAsync(int id, UpdateWorkCompanyDto dto)
        {
            var workCompany = await _context.WorkCompanies.FindAsync(id);

            if(workCompany == null)
                return Response(ResultFactory.NotFound());

            _mapper.Map(dto, workCompany);

            _context.WorkCompanies.Update(workCompany);
            await _context.SaveChangesAsync();

            return Response(ResultFactory.Ok());
        }

        [HttpDelete("{id}/delete")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var workCompany = await _context.WorkCompanies.FindAsync(id);

            if (workCompany == null)
                return Response(ResultFactory.NotFound());

            _context.WorkCompanies.Remove(workCompany);
            await _context.SaveChangesAsync();

            return Response(ResultFactory.Ok());
        }

        [HttpGet("{id}/getById")]
        public async Task<IActionResult> GetByIdAsync(int id)
        {
            var workCompany = await _context.WorkCompanies
                .ProjectTo<WorkCompanyDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(wc => wc.Id == id);

            if(workCompany == null)
                return Response(ResultFactory.NotFound());

            return Response(ResultFactory.Ok(workCompany));
        }

        [HttpGet("getByWorkId")]
        public async Task<IActionResult> GetByWorkIdAsync([FromQuery] int workId)
        {
            var workCompanies = await _context.WorkCompanies
                .Where(wc => wc.WorkId == workId)
                .ProjectTo<WorkCompanyDetailedDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

            return Response(ResultFactory.Ok(workCompanies));
        }
    }
}
