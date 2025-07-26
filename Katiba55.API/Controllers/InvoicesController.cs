using AutoMapper.QueryableExtensions;
using Katiba55.API.Data;
using Katiba55.API.Dtos.Invoices;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Katiba55.API.Controllers
{
    [Route("api/invoices")]
    public class InvoicesController: BaseController
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public InvoicesController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateAsync(CreateInvoiceDto dto)
        {
            var invoice = _mapper.Map<Invoice>(dto);

            _context.Invoices.Add(invoice);
            await _context.SaveChangesAsync();

            return Response(ResultFactory.Ok(invoice.Id));
        }

        [HttpPut("{id}/edit")]
        public async Task<IActionResult> UpdateAsync(int id, UpdateInvoiceDto dto)
        {
            var invoice = await _context.Invoices.FindAsync(id);

            if (invoice == null)
                return Response(ResultFactory.NotFound());

            _mapper.Map(dto, invoice);

            _context.Invoices.Update(invoice);
            await _context.SaveChangesAsync();

            return Response(ResultFactory.Ok());
        }

        [HttpDelete("{id}/delete")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var invoice = await _context.Invoices.FindAsync(id);

            if (invoice == null)
                return Response(ResultFactory.NotFound());

            _context.Invoices.Remove(invoice);
            await _context.SaveChangesAsync();

            return Response(ResultFactory.Ok());
        }

        [HttpGet("{id}/getById")]
        public async Task<IActionResult> GetByIdAsync(int id)
        {
            var invoice = await _context.Invoices
                .ProjectTo<InvoiceDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(i => i.Id == id);

            if (invoice == null)
                return Response(ResultFactory.NotFound());

            return Response(ResultFactory.Ok(invoice));
        }

        [HttpGet("getByContractId")]
        public async Task<IActionResult> GetByContractIdAsync([FromQuery]int contractId)
        {
            var invoices = await _context.Invoices
                .Where(i => i.ContractId == contractId)
                .ProjectTo<InvoiceDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

            return Response(ResultFactory.Ok(invoices));
        }
    }
}
