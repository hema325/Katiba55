namespace Katiba55.API.Entities
{
    public class ProjectCompany: BaseEntity
    {
        public string Role { get; set; }
        public DateTimeOffset StartDate { get; set; }
        public DateTimeOffset EndDate { get; set; }
        public string Notes { get; set; }

        public long CompanyId { get; set; }
        public Company Company { get; set; }
        public long ProjectId { get; set; }
        public Project Project { get; set; }
    }
}
