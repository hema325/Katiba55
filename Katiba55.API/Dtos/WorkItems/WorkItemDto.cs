namespace Katiba55.API.Dtos.WorkItems
{
    public class WorkItemDto
    {
        public int Id { get; set; }
        public decimal TotalValue { get; set; }
        public decimal ExecutedValue { get; set; }
        public decimal RelativeWeight { get; set; } // calculated
        public decimal ExecutionPercent { get; set; } // calculated
        public DateTime ExecutionDate { get; set; } // calculated
        public string ExecutionStatus { get; set; }
        public int WorkId { get; set; }
        public int ItemId { get; set; }
    }
}
