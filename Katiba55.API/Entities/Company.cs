﻿namespace Katiba55.API.Entities
{
    public class Company: BaseEntity
    {
        public string Name { get; set; }
        public string? RepresentativeName { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public CompanyStatus Status { get; set; }
        public string? Address { get; set; }
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }
        public string? ApprovalImagePath { get; set; }
        public string? Notes { get; set; }

        public ICollection<Work> Works { get; set; }
    }
}
