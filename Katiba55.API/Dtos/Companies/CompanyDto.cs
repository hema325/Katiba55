namespace Katiba55.API.Dtos.Companies
{
    public class CompanyDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string RepresentativeName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string Latitude { get; set; }
        public string Longitude { get; set; }
        public string SecurityApprovalPath { get; set; }
        public string? Notes { get; set; }
    }
}
