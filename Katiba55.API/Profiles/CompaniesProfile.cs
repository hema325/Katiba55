
using Katiba55.API.Dtos.Companies;

namespace Katiba55.API.Profiles
{
    public class CompaniesProfile: Profile
    {
        public CompaniesProfile()
        {
            CreateMap<CreateCompanyDto, Company>();
            CreateMap<UpdateCompanyDto, Company>();
            CreateMap<Company, CompanyBriefDto>();
            CreateMap<Company, CompanyDto>();
        }
    }
}
