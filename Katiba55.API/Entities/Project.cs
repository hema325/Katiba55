namespace Katiba55.API.Entities
{
    public class Project: BaseEntity
    {
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
        public ExecutionStatus ExecutionStatus { get; set; }

        public string? Notes { get; set; }

        public int SupervisorId { get; set; }
        public Officer Supervisor { get; set; }

        public ICollection<Media>? Medias { get; set; }
        public ICollection<Work>? Works { get; set; }
        public ICollection<Item>? Items { get; set; }
        public ICollection<ProjectExecutionHistory>? ExecutionHistories { get; set; }
    }
}
