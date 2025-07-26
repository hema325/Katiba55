using AutoMapper.QueryableExtensions;
using Katiba55.API.Data;
using Katiba55.API.Dtos.BOQs;
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
            if (await _context.BOQs.AnyAsync(b => b.Number == dto.Number))
                return Response(ResultFactory.Conflict("هذة المقايسة موجودة بالفعل."));

            var boq = _mapper.Map<BOQ>(dto);

            _context.BOQs.Add(boq);
            await _context.SaveChangesAsync();

            return Response(ResultFactory.Ok(boq.Id));
        }

        [HttpPut("{id}/edit")]
        public async Task<IActionResult> UpdateAsync(int id, UpdateBOQDto dto)
        {
            if (await _context.BOQs.AnyAsync(b => b.Id != id && b.Number == dto.Number))
                return Conflict(ResultFactory.Conflict("هذة المقايسة موجودة بالفعل."));

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
    }
}
