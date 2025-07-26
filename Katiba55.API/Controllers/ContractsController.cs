using AutoMapper.QueryableExtensions;
using Katiba55.API.Data;
using Katiba55.API.Dtos.Contracts;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Katiba55.API.Controllers
{
    [Route("/api/contracts")]
    public class ContractsController : BaseController
    {
       private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public ContractsController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateAsync(CreateContractDto dto)
        {
            if (await _context.Contracts.AnyAsync(c => c.Number == dto.Number))
                return Response(ResultFactory.Conflict("هذا العقد موجود بالفعل."));

            var contract = _mapper.Map<Contract>(dto);

            _context.Contracts.Add(contract);
            await _context.SaveChangesAsync();

            return Response(ResultFactory.Ok(contract.Id));
        }

        [HttpPut("{id}/edit")]
        public async Task<IActionResult> UpdateAsync(int id, UpdateContractDto dto)
        {
            if (await _context.Contracts.AnyAsync(c => c.Id != id && c.Number == dto.Number))
                return Response(ResultFactory.Conflict("هذا العقد موجود بالفعل."));

            var contract = await _context.Contracts.FindAsync(id);

            if (contract == null)
                return Response(ResultFactory.NotFound());

            _mapper.Map(dto, contract);

            _context.Contracts.Update(contract);
            await _context.SaveChangesAsync();

            return Response(ResultFactory.Ok(contract.Id));
        }

        [HttpDelete("{id}/delete")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var contract = await _context.Contracts.FindAsync(id);

            if (contract == null)
                return Response(ResultFactory.NotFound());

            _context.Contracts.Remove(contract);
            await _context.SaveChangesAsync();

            return Response(ResultFactory.Ok(contract.Id));
        }

        [HttpGet("{id}/getById")]
        public async Task<IActionResult> GetByIdAsync(int id)
        {
            var contract = await _context.Contracts
                .ProjectTo<ContractDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (contract == null)
                return Response(ResultFactory.NotFound());

            return Response(ResultFactory.Ok(contract));
        }

        [HttpGet("getByBOQId")]
        public async Task<IActionResult> GetByBOQIdAsync([FromQuery] int boqId)
        {
            var contract = await _context.Contracts
                .Where(c => c.BOQId == boqId)
                .ProjectTo<ContractDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync();

            return Response(ResultFactory.Ok(contract));
        }
    }
}
