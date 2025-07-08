using AutoMapper.QueryableExtensions;
using Katiba55.API.Data;
using Katiba55.API.Dtos.Companies;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Katiba55.API.Controllers
{
    [Route("api/companies")]
    public class CompaniesController : BaseController
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public CompaniesController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateAsync(CreateCompanyDto dto)
        {
            if (await _context.Companies.AnyAsync(c => c.Name == dto.Name)) 
                return Response(ResultFactory.Conflict("الاسم المدخل موجود مسبقًا. يرجى اختيار اسم آخر"));

            var company = _mapper.Map<Company>(dto);

            _context.Companies.Add(company);
            await _context.SaveChangesAsync();

            return Response(ResultFactory.Ok(company.Id));
        }

        [HttpPut("{id}/update")]
        public async Task<IActionResult> UpdateAsync(int id, UpdateCompanyDto dto)
        {
            var company = await _context.Companies.FindAsync(id);

            if (company == null)
                return Response(ResultFactory.NotFound());

            if (await _context.Companies.AnyAsync(c => c.Id != id && c.Name == dto.Name))
                return Response(ResultFactory.Conflict("الاسم المدخل موجود مسبقًا. يرجى اختيار اسم آخر"));

            _mapper.Map(dto, company);

            _context.Companies.Update(company);
            await _context.SaveChangesAsync();

            return Response(ResultFactory.NoContent());
        }

        [HttpDelete("{id}/delete")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var company = await _context.Companies.FindAsync(id);

            if (company == null)
                return Response(ResultFactory.NotFound());

            try
            {
                if(!string.IsNullOrEmpty(company.ApprovalImagPath))
                {
                    System.IO.File.Delete(company.ApprovalImagPath);
                }
            }
            catch
            {
                return Response(ResultFactory.BadRequest(message: "حدث خطأ أثناء حذف صورة الموافقة الأمنية. يرجى المحاولة مرة أخرى."));
            }

            _context.Companies.Remove(company);
            await _context.SaveChangesAsync();

            return Response(ResultFactory.NoContent());
        }

        [HttpGet("{id}/detailed")]
        public async Task<IActionResult> GetDetailedAsync(int id)
        {
            var company = await _context.Companies
                .ProjectTo<CompanyDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (company == null)
                return Response(ResultFactory.NotFound());

            return Response(ResultFactory.Ok(company));
        }

        [HttpGet("brief")]
        public async Task<IActionResult> GetAllBriefAsync()
        {
            var companies = await _context.Companies
                         .ProjectTo<CompanyBriefDto>(_mapper.ConfigurationProvider)
                         .ToListAsync();

            return Response(ResultFactory.Ok(companies));
        }

        [HttpGet("detailed")]
        public async Task<IActionResult> GetDetailedAsync()
        {
            var companies = await _context.Companies
                         .ProjectTo<CompanyDto>(_mapper.ConfigurationProvider)
                         .ToListAsync();

            return Response(ResultFactory.Ok(companies));
        }
    }
}
