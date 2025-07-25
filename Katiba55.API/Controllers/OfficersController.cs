﻿using AutoMapper.QueryableExtensions;
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

            var officer = _mapper.Map<Officer>(dto);

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

            _mapper.Map(dto, officer);

            _context.Officers.Update(officer);
            await _context.SaveChangesAsync();

            return Response(ResultFactory.Ok());
        }

        [HttpDelete("{id}/delete")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var officer = await _context.Officers.FindAsync(id);

            if (officer == null)
                return Response(ResultFactory.NotFound());

            if (await _context.Projects.AnyAsync(p => p.SupervisorId == id))
                return Response(ResultFactory.Conflict("لا يمكن حذف هذا الضابط لانة مشرف على احد المشاريع."));

            _context.Officers.Remove(officer);
            await _context.SaveChangesAsync();

            return Response(ResultFactory.Ok());
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
    }
}
