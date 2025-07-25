﻿using System.ComponentModel.DataAnnotations;

namespace Katiba55.API.Dtos.Companies
{
    public class UpdateCompanyDto
    {
        public string Name { get; set; }
        public string? RepresentativeName { get; set; }
        [EmailAddress]
        public string? Email { get; set; }
        [Phone]
        public string? Phone { get; set; }
        [EnumDataType(typeof(CompanyStatus))]
        public string Status { get; set; }
        public string? Address { get; set; }
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }
        public string? ApprovalImagePath { get; set; }
        public string? Notes { get; set; }
    }
}
