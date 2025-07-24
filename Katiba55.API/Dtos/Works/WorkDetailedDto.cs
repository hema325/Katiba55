using Katiba55.API.Dtos.Companies;
using Katiba55.API.Dtos.WorkItems;

namespace Katiba55.API.Dtos.Works
{
    public class WorkDetailedDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime? EstimatedStartDate { get; set; }
        public DateTime? EstimatedEndDate { get; set; }
        public DateTime? ActualStartDate { get; set; }
        public DateTime? ActualEndDate { get; set; }
        public decimal? TotalValue { get; set; }
        public decimal? ExecutedValue { get; set; }
        public decimal? RelativeWeightPercent { get; set; }
        public decimal? ExecutionPercent { get; set; }
        public DateTime? ExecutionDate { get; set; }
        public decimal? RelativeExecutionPercent { get; set; }
        public string ExecutionStatus { get; set; }
        public string? Notes { get; set; }
        public CompanyBriefDto? Responsible { get; set; }
    }
}
