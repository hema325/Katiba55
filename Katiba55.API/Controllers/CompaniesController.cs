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

            if(dto.ApprovalImagePath != company.ApprovalImagePath)
            {
                try
                {
                    if (System.IO.File.Exists(company.ApprovalImagePath))
                        System.IO.File.Delete(company.ApprovalImagePath);
                }
                catch
                {
                }
            }

            _mapper.Map(dto, company);

            _context.Companies.Update(company);
            await _context.SaveChangesAsync();

            return Response(ResultFactory.Ok());
        }

        [HttpDelete("{id}/delete")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            if(await _context.Companies.AnyAsync(c=>c.Id == id && c.Works.Any()))
                return Response(ResultFactory.Conflict("لا يمكن حذف هذه الشركة نظرًا لإشرافها على بعض أعمال المشاريع الجارية."));

            var company = await _context.Companies.FindAsync(id);

            if (company == null)
                return Response(ResultFactory.NotFound());

            try
            {
                if(System.IO.File.Exists(company.ApprovalImagePath))
                    System.IO.File.Delete(company.ApprovalImagePath);
            }
            catch
            {
            }

            _context.Companies.Remove(company);
            await _context.SaveChangesAsync();

            return Response(ResultFactory.Ok());
        }

        [HttpGet("{id}/getById")]
        public async Task<IActionResult> GetByIdAsync(int id)
        {
            var company = await _context.Companies
                .ProjectTo<CompanyDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (company == null)
                return Response(ResultFactory.NotFound());

            return Response(ResultFactory.Ok(company));
        }

        [HttpGet("getAll")]
        public async Task<IActionResult> GetAllAsync()
        {
            var companies = await _context.Companies
                         .ProjectTo<CompanyBriefDto>(_mapper.ConfigurationProvider)
                         .ToListAsync();

            return Response(ResultFactory.Ok(companies));
        }
    }
}
