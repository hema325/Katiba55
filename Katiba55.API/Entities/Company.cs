namespace Katiba55.API.Entities
{
    public class Company
    {
        public string Name { get; set; }
        public string RepresentativeName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string Latitude { get; set; }
        public string Longitude { get; set; }
        public string LogoPath { get; set; }
        public string SecurityApprovalPath { get; set; }
        public string Notes { get; set; }

        public ICollection<ProjectCompany> ProjectCompanies { get; set; }
    }
}
