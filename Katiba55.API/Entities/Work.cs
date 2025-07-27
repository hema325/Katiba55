namespace Katiba55.API.Entities
{
    public class Work: BaseEntity
    {
        public string Name { get; set; }
        public DateTime? EstimatedStartDate { get; set; }
        public DateTime? EstimatedEndDate { get; set; }
        public DateTime? ActualStartDate { get; set; }
        public DateTime? ActualEndDate { get; set; }
        public decimal? TotalValue { get; set; }
        public decimal? ExecutedValue { get; set; }
        public decimal? RemainingValue { get; set; }
        public decimal? RelativeWeightPercent { get; set; } 
        public decimal? ExecutionPercent { get; set; }
        public DateTime? ExecutionDate { get; set; }
        public ExecutionStatus ExecutionStatus { get; set; } 
        public string? Notes { get; set; }

        public int? ResponsibleId { get; set; }
        public Company? Responsible { get; set; }

        public int ProjectId { get; set; }
        public Project Project { get; set; }

        public ICollection<Item> Items { get; set; }
        public ICollection<BOQ> BOQs { get; set; }
        public ICollection<WorkExecutionHistory>? ExecutionHistories { get; set; }

    }
}
