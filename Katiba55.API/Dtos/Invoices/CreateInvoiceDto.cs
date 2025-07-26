namespace Katiba55.API.Dtos.Invoices
{
    public class CreateInvoiceDto
    {
        public string Type { get; set; }
        public string Status { get; set; }
        public decimal Value { get; set; }
        public string Location { get; set; }
        public int ContractId { get; set; }
    }
}
