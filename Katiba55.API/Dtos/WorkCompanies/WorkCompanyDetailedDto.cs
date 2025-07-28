using Katiba55.API.Dtos.Companies;

namespace Katiba55.API.Dtos.WorkCompanies
{
    public class WorkCompanyDetailedDto
    {
        public int Id { get; set; }
        public string Role { get; set; }
        public CompanyBriefDto Company { get; set; }
    }
}
