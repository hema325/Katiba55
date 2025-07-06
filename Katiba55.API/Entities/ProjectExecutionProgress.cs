namespace Katiba55.API.Entities
{
    public class ProjectExecutionProgress: BaseEntity
    {
        public double Percentage { get; set; }
        public DateTimeOffset Date { get; set; }
        public string? Details { get; set; }
        public string? Notes { get; set; }

        public int ProjectId { get; set; }
        public Project Project { get; set; }
    }
}
