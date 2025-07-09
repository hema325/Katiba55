namespace Katiba55.API.Entities
{
    public class ProjectExecutionHistory: BaseEntity
    {
        public double Percentage { get; set; }
        public DateTime Date { get; set; }

        public int ProjectId { get; set; }
        public Project Project { get; set; }
    }
}
