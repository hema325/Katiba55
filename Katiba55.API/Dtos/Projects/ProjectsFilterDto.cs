namespace Katiba55.API.Dtos.Projects
{
    public class ProjectsFilterDto: PaginationFilter
    {
        public string? Name { get; set; }
        public ProjectStatus? Status { get; set; }
        public long? SupervisorId { get; set; }
        public long[]? CompaniesId { get; set; }
        public DateTimeOffset? FromDate { get; set; }
        public DateTimeOffset? ToDate { get; set; }
    }
}
