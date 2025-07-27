using System.ComponentModel.DataAnnotations;

namespace Katiba55.API.Dtos.Works
{
    public class UpdateWorkDto
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
        [EnumDataType(typeof(ExecutionStatus))]
        public string ExecutionStatus { get; set; }
        public int? ResponsibleId { get; set; }
        public string? Notes { get; set; }
    }
}
