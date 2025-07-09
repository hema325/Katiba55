namespace Katiba55.API.Entities
{
    public class Work: BaseEntity
    {
        public string Name { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }

        public double? ExecutionPercent { get; set; }
        public DateTime? ExecutionDate { get; set; }

        public int? ResponsibleId { get; set; }
        public Company? Responsible { get; set; }

        public int ProjectId { get; set; }
        public Project Project { get; set; }

        public ICollection<WorkItem> WorkItems { get; set; }
        public ICollection<WorkExecutionHistory>? ExecutionHistories { get; set; }

    }
}
