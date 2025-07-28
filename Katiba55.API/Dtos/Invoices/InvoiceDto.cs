namespace Katiba55.API.Dtos.Invoices
{
    public class InvoiceDto
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public string Status { get; set; }
        public decimal Value { get; set; }
        public string? Location { get; set; }
    }
}
