using System.ComponentModel.DataAnnotations;

namespace Katiba55.API.Dtos.Works
{
    public class CreateWorkDto
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
        [EnumDataType(typeof(ExecutionStatus))]
        public string ExecutionStatus { get; set; }
        public int ProjectId { get; set; }
        public string? Notes { get; set; }
    }
}
