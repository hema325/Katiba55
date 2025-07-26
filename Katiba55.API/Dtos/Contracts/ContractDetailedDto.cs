using Katiba55.API.Dtos.Invoices;

namespace Katiba55.API.Dtos.Contracts
{
    public class ContractDetailedDto
    {
        public int Id { get; set; }
        public string Status { get; set; }
        public string Number { get; set; }
        public decimal Value { get; set; }

        public ICollection<InvoiceDto> Invoices { get; set; }
    }
}
