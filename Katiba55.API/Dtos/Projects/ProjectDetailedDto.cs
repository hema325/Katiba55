using Katiba55.API.Dtos.Officers;

namespace Katiba55.API.Dtos.Projects
{
    public class ProjectDetailedDto
    {
        public int Id { get; set; }
        public string PosterPath { get; set; }
        public string Name { get; set; }
        public string ExecutingSide { get; set; }
        public string BenefitingSide { get; set; }
        public decimal EstimatedCost { get; set; }
        public decimal FinancialAllocation { get; set; }
        public DateTimeOffset StartDate { get; set; }
        public DateTimeOffset EndDate { get; set; }
        public string Address { get; set; }
        public string Latitude { get; set; }
        public string Longitude { get; set; }
        public ProjectStatus Status { get; set; }
        public string? Details { get; set; }
        public string? Notes { get; set; }
        public OfficerDto Supervisor { get; set; }
    }
}
