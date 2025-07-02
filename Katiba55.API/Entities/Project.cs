namespace Katiba55.API.Entities
{
    public class Project: BaseEntity
    {
        public string Name { get; set; }
        public string ExecutingSide { get; set; } 
        public string BenefitingSide { get; set; } 
        public string EstimatedCost { get; set; } 
        public string FinancialAllocation { get; set; }
        public DateTimeOffset StartDate { get; set; }
        public DateTimeOffset EndDate { get; set; }
        public double ExecutionPercentage { get; set; }
        public string Address { get; set; }
        public string Latitude { get; set; }
        public string Longitude { get; set; }
        public ProjectStatus Status { get; set; }
        public string Details { get; set; }
        public string Notes { get; set; }

        public long SupervisorId { get; set; }
        public Officer Supervisor { get; set; }
       
        public ICollection<ExecutionPercentageHistory> ExecutionPercentageHistory { get; set; }
        public ICollection<ProjectCompany> ProjectCompanies { get; set; }
        public ICollection<ProjectMedia> ProjectMedias { get; set; }
    }
}
