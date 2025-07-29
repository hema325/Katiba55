namespace Katiba55.API.Entities
{
    public class Item: BaseEntity
    {
        public string Name { get; set; }
        public DateTime? EstimatedStartDate { get; set; }
        public DateTime? EstimatedEndDate { get; set; }
        public DateTime? ActualStartDate { get; set; }
        public DateTime? ActualEndDate { get; set; }
        public double? TotalValue { get; set; }
        public double? ExecutedValue { get; set; }
        public double? RemainingValue { get; set; }
        public double? RelativeWeightPercent { get; set; }
        public double? ExecutionPercent { get; set; }
        public DateTime? ExecutionDate { get; set; }
        public ExecutionStatus ExecutionStatus { get; set; }
        public string? Notes { get; set; }

        public int WorkId { get; set; }
        public Work Work { get; set; }
    }
}
