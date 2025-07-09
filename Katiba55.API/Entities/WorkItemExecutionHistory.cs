namespace Katiba55.API.Entities
{
    public class WorkItemExecutionHistory: BaseEntity
    {
        public double Percentage { get; set; }
        public DateTime Date { get; set; }

        public int WorkItemId { get; set; }
        public WorkItem WorkItem { get; set; }
    }
}
