namespace Katiba55.API.Entities
{
    public class Invoice: BaseEntity
    {
        public string Type { get; set; }
        public string Status { get; set; }
        public decimal Value { get; set; }
        public string Location { get; set; }

        public int ContractId { get; set; }
        public Contract Contract { get; set; }
    }
}
