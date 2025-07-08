namespace Katiba55.API.Entities
{
    public class ProjectWorkItem: BaseEntity
    {
        public string Name { get; set; }
        public int TotalCount { get; set; }
        public int ExecutedCount { get; set; }
        public double ExecutionPercentage { get; set; }

        public int WorkId { get; set; }
        public ProjectWork Work { get; set; }
    }
}
