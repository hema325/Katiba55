using AutoMapper.QueryableExtensions;
using Katiba55.API.Data;
using Katiba55.API.Dtos.Advances;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Katiba55.API.Controllers
{
    [Route("api/advances")]
    public class AdvancesController: BaseController
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public AdvancesController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateAsync(CreateAdvanceDto dto)
        {
            var advance = _mapper.Map<Advance>(dto);

            _context.Advances.Add(advance);
            await _context.SaveChangesAsync();

            return Response(ResultFactory.Ok(advance.Id));
        }

        [HttpPut("{id}/edit")]
        public async Task<IActionResult> UpdateAsync(int id, UpdateAdvanceDto dto)
        {
            var advance = await _context.Advances.FindAsync(id);

            if (advance == null)
                return Response(ResultFactory.NotFound());

            _mapper.Map(dto, advance);

            _context.Advances.Update(advance);
            await _context.SaveChangesAsync();

            return Response(ResultFactory.Ok());
        }

        [HttpDelete("{id}/delete")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var advance = await _context.Advances.FindAsync(id);

            if (advance == null)
                return Response(ResultFactory.NotFound());

            _context.Advances.Remove(advance);
            await _context.SaveChangesAsync();

            return Response(ResultFactory.Ok());
        }

        [HttpGet("{id}/getById")]
        public async Task<IActionResult> GetByIdAsync(int id)
        {
            var advance = await _context.Advances
                .ProjectTo<AdvanceDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(a => a.Id == id);

            if (advance == null)
                return Response(ResultFactory.NotFound());

            return Response(ResultFactory.Ok(advance));
        }

        [HttpGet("getByContractId")]
        public async Task<IActionResult> GetByContractIdAsync(int contractId)
        {
            var advances = await _context.Advances
                .Where(a => a.ContractId == contractId)
                .ProjectTo<AdvanceDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

            return Response(ResultFactory.Ok(advances));
        }
    }
}
