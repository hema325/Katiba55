namespace Katiba55.API.Entities
{
    public class WorkCompany: BaseEntity
    {
        public string Role { get; set; }
        public int WorkId { get; set; }
        public int CompanyId { get; set; }

        public Work Work { get; set; }
        public Company Company { get; set; }
    }
}
