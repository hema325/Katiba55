namespace Katiba55.API.Entities
{
    public class BOQ: BaseEntity
    {
        public string Title { get; set; }
        public string Status { get; set; }
        public string Number { get; set; }
        public decimal? Value { get; set; }

        public int CompanyId { get; set; }
        public Company Company { get; set; }
        public Contract Contract { get; set; }
        public ICollection<Work> Works { get; set; }

    }
}
