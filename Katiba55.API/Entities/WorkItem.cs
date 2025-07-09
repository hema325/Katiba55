namespace Katiba55.API.Entities
{
    public class WorkItem: BaseEntity
    {
        public double? ExecutionPercent { get; set; }
        public DateTime? ExecutionDate { get; set; }
        
        public int WorkId { get; set; }
        public Work Work { get; set; }

        public int ItemId { get; set; }
        public Item Item { get; set; }

        public ICollection<WorkItemExecutionHistory>? ExecutionHistories { get; set; }

    }
}
