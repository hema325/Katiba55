namespace Katiba55.API.Entities
{
    public class Contract : BaseEntity
    {
        public string Status { get; set; }
        public string? Number { get; set; }
        public double? Value { get; set; }

        public int BOQId { get; set; }
        public BOQ BOQ { get; set; }

        public ICollection<Invoice> Invoices { get; set; }
        public ICollection<Advance> Advances { get; set; }
    }
}
