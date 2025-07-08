namespace Katiba55.API.Entities
{
    public class ProjectProgress: BaseEntity
    {
        public double ExecutionPercentage { get; set; }
        public DateTime Date { get; set; }

        public int ProjectId { get; set; }
        public Project Project { get; set; }
    }
}
