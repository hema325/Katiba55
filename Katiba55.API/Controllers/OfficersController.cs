using AutoMapper.QueryableExtensions;
using Katiba55.API.Data;
using Katiba55.API.Dtos.Officers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Katiba55.API.Controllers
{
    [Route("api/officers")]
    public class OfficersController : BaseController
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public OfficersController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpPost("Create")]
        public async Task<IActionResult> CreateAsync(CreateOfficerDto dto)
        {
            if (await _context.Officers.AnyAsync(o => o.Name == dto.Name))
                return Response(ResultFactory.Conflict("الاسم المدخل موجود مسبقًا. يرجى اختيار اسم آخر"));

            if (await _context.Officers.AnyAsync(o => o.Email == dto.Email))
                return Response(ResultFactory.Conflict("البريد الإلكتروني هذا مستخدم بالفعل. يرجى إدخال بريد إلكتروني آخر"));

            if (await _context.Officers.AnyAsync(o => o.Phone == dto.Phone))
                return Response(ResultFactory.Conflict("رقم الهاتف هذا مسجّل لدينا من قبل. الرجاء استخدام رقم مختلف."));

            var officer = _mapper.Map<Officer>(dto);

            if (dto.LeaveDate != null)
                officer.Status = OfficerStatus.OutBattalion;
            else
                officer.Status = OfficerStatus.InBattalion;

            _context.Officers.Add(officer);
            await _context.SaveChangesAsync();

            return Response(ResultFactory.Ok(officer.Id));
        }

        [HttpPut("{id}/update")]
        public async Task<IActionResult> UpdateAsync(int id, UpdateOfficerDto dto)
        {
            var officer = await _context.Officers.FindAsync(id);

            if (officer == null)
                return Response(ResultFactory.NotFound());

            if (await _context.Officers.AnyAsync(o => o.Id != id && o.Name == dto.Name))
                return Response(ResultFactory.Conflict("الاسم المدخل موجود مسبقًا. يرجى اختيار اسم آخر"));

            if (await _context.Officers.AnyAsync(o => o.Id != id && o.Email == dto.Email))
                return Response(ResultFactory.Conflict("البريد الإلكتروني هذا مستخدم بالفعل. يرجى إدخال بريد إلكتروني آخر"));

            if (await _context.Officers.AnyAsync(o => o.Id != id && o.Phone == dto.Phone))
                return Response(ResultFactory.Conflict("رقم الهاتف هذا مسجّل لدينا من قبل. الرجاء استخدام رقم مختلف."));

            if (dto.LeaveDate != null)
                officer.Status = OfficerStatus.OutBattalion;
            else
                officer.Status = OfficerStatus.InBattalion;

            _mapper.Map(dto, officer);

            _context.Officers.Update(officer);
            await _context.SaveChangesAsync();

            return Response(ResultFactory.NoContent());
        }

        [HttpDelete("{id}/delete")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var officer = await _context.Officers.FindAsync(id);

            if (officer == null)
                return Response(ResultFactory.NotFound());

            _context.Officers.Remove(officer);
            await _context.SaveChangesAsync();

            return Response(ResultFactory.NoContent());
        }

        [HttpGet("{id}/getById")]
        public async Task<IActionResult> GetByIdAsync(int id)
        {
            var officer = await _context.Officers
                .ProjectTo<OfficerDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(o=>o.Id == id);

            if (officer == null)
                return Response(ResultFactory.NotFound());

            return Response(ResultFactory.Ok(officer));
        }

        [HttpGet("getAll")]
        public async Task<IActionResult> GetAllAsync()
        {
            var officers = await _context.Officers
                .ProjectTo<OfficerBriefDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

            return Response(ResultFactory.Ok(officers));
        }

        [HttpGet("paginate")]
        public async Task<IActionResult> PaginateAsync([FromQuery] OfficerFilterDto dto)
        {
            var query = _context.Officers.AsQueryable();

            if (!string.IsNullOrEmpty(dto.Name))
                query = query.Where(o => o.Name.Contains(dto.Name));
            
            if (!string.IsNullOrEmpty(dto.Email))
                query = query.Where(o => o.Email.Contains(dto.Email));
            
            if (!string.IsNullOrEmpty(dto.Phone))
                query = query.Where(o => o.Email.Contains(dto.Phone));

            if (dto.Rank != null)
                query = query.Where(o => o.Rank == dto.Rank);

            if(dto.Status != null)
                query = query.Where(o=>o.Status == dto.Status); 

            var officers = await query
                         .ProjectTo<OfficerDto>(_mapper.ConfigurationProvider)
                         .PaginateAsync(dto.PageNumber, dto.PageSize);

            return Response(ResultFactory.Ok(officers));
        }
    }
}
