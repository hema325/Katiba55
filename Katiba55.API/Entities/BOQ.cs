namespace Katiba55.API.Entities
{
    public class BOQ: BaseEntity
    {
        public string Status { get; set; }
        public string Number { get; set; }
        public decimal Value { get; set; }
        public int WorkId { get; set; }
        public Work Work { get; set; }
        public Contract Contract { get; set; }
    }
}
