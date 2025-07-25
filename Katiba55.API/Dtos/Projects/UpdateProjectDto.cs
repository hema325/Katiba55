﻿using System.ComponentModel.DataAnnotations;

namespace Katiba55.API.Dtos.Projects
{
    public class UpdateProjectDto
    {
        public string Name { get; set; }
        public string? ExecutingSide { get; set; }
        public string? BenefitingSide { get; set; }
        public decimal? EstimatedCost { get; set; }
        public decimal? FinancialAllocation { get; set; }
        public DateTime? EstimatedStartDate { get; set; }
        public DateTime? EstimatedEndDate { get; set; }
        public DateTime? ActualStartDate { get; set; }
        public DateTime? ActualEndDate { get; set; }
        public string? Address { get; set; }
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }
        public int SupervisorId { get; set; }
        public decimal? ExecutionPercent { get; set; }
        public DateTime? ExecutionDate { get; set; }
        [EnumDataType(typeof(ExecutionStatus))]
        public string ExecutionStatus { get; set; }
        public string? Notes { get; set; }
    }
}
