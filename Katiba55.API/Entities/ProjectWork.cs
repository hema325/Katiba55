namespace Katiba55.API.Entities
{
    public class ProjectWork: BaseEntity
    {
        public string Name { get; set; }
        public double ExecutionPercentage { get; set; }

        public int? ResponsibleId { get; set; }
        public Company? Responsible { get; set; }

        public int ProjectId { get; set; }
        public Project Project { get; set; }

        public ICollection<ProjectWorkItem> Items { get; set; }
    }
}
