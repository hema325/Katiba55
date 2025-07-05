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
            {
                return Response(ResultFactory.Conflict("الاسم المدخل موجود مسبقًا. يرجى اختيار اسم آخر"));
            }

            if (await _context.Companies.AnyAsync(c => c.Email == dto.Email)) 
            {
                return Response(ResultFactory.Conflict("البريد الإلكتروني هذا مستخدم بالفعل. يرجى إدخال بريد إلكتروني آخر"));
            }

            if (await _context.Companies.AnyAsync(c => c.Phone == dto.Phone)) 
            {
                return Response(ResultFactory.Conflict("رقم الهاتف هذا مسجّل لدينا من قبل. الرجاء استخدام رقم مختلف."));
            }

            var company = _mapper.Map<Company>(dto);

            _context.Companies.Add(company);
            await _context.SaveChangesAsync();

            return Response(ResultFactory.Ok(company.Id));
        }

        [HttpPut("{id}/update")]
        public async Task<IActionResult> UpdateAsync(int id, UpdateCompanyDto dto)
        {
            if (await _context.Companies.AnyAsync(c => c.Id != id && c.Name == dto.Name))
            {
                return Response(ResultFactory.Conflict("الاسم المدخل موجود مسبقًا. يرجى اختيار اسم آخر"));
            }

            if (await _context.Companies.AnyAsync(c => c.Id != id && c.Email == dto.Email))
            {
                return Response(ResultFactory.Conflict("البريد الإلكتروني هذا مستخدم بالفعل. يرجى إدخال بريد إلكتروني آخر"));
            }

            if (await _context.Companies.AnyAsync(c => c.Id != id && c.Phone == dto.Phone))
            {
                return Response(ResultFactory.Conflict("رقم الهاتف هذا مسجّل لدينا من قبل. الرجاء استخدام رقم مختلف."));
            }

            var company = await _context.Companies.FindAsync(id);

            if (company == null)
                return Response(ResultFactory.NotFound());

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

            _context.Companies.Remove(company);
            await _context.SaveChangesAsync();

            return Response(ResultFactory.NoContent());
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

        [HttpGet("paginate")]
        public async Task<IActionResult> PaginateAsync([FromQuery] CompanyFilterDto dto)
        {
            var query = _context.Companies.AsQueryable();

            if(!string.IsNullOrEmpty(dto.Name))
            {
                query = query.Where(c => c.Name.StartsWith(dto.Name));
            }
            else if(!string.IsNullOrEmpty(dto.Email))
            {
                query = query.Where(c => c.Email.StartsWith(dto.Email));
            }
            else if(!string.IsNullOrEmpty(dto.Phone))
            {
                query = query.Where(c => c.Email.StartsWith(dto.Phone));
            }

            var companies = await query
                         .ProjectTo<CompanyDto>(_mapper.ConfigurationProvider)
                         .PaginateAsync(dto.PageNumber, dto.PageSize);

            return Response(ResultFactory.Ok(companies));
        }
    }
}
