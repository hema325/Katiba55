using Katiba55.API.Dtos.Officers;

namespace Katiba55.API.Dtos.Projects
{
    public class ProjectDetailedDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? ExecutingSide { get; set; }
        public string? BenefitingSide { get; set; }
        public double? EstimatedCost { get; set; }
        public double? FinancialAllocation { get; set; }
        public DateTime? EstimatedStartDate { get; set; }
        public DateTime? EstimatedEndDate { get; set; }
        public DateTime? ActualStartDate { get; set; }
        public DateTime? ActualEndDate { get; set; }
        public string? Address { get; set; }
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }
        public double? ExecutionPercent { get; set; }
        public DateTime? ExecutionDate { get; set; }
        public string ExecutionStatus { get; set; }

        public OfficerBriefDto Supervisor { get; set; }
        public string? Notes { get; set; }
    }
}
