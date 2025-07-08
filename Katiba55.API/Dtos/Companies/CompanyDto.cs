namespace Katiba55.API.Dtos.Companies
{
    public class CompanyDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? RepresentativeName { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public CompanyStatus Status { get; set; }
        public string? Address { get; set; }
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }
        public string? ApprovalImagPath { get; set; }
    }
}
