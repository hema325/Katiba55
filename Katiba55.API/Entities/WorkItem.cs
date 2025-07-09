namespace Katiba55.API.Entities
{
    public class WorkItem: BaseEntity
    {
        public int TotalCount { get; set; }
        public int ExecutedCount { get; set; }
        public int UnexecutedCount { get; set; }
        public double ExecutionPercent { get; set; }
        public DateTime UpdateDate { get; set; }
        

        public int WorkId { get; set; }
        public Work Work { get; set; }

        public int ItemId { get; set; }
        public Item Item { get; set; }

        public ICollection<WorkItemExecutionHistory>? ExecutionHistories { get; set; }

    }
}
