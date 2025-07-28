using Katiba55.API.Dtos.WorkCompanies;

namespace Katiba55.API.Profiles
{
    public class WorkCompaniesProfile: Profile
    {
        public WorkCompaniesProfile()
        {
            CreateMap<CreateWorkCompanyDto, WorkCompany>();
            CreateMap<UpdateWorkCompanyDto, WorkCompany>();
            CreateMap<WorkCompany, WorkCompanyDto>();
            CreateMap<WorkCompany, WorkCompanyDetailedDto>();
        }
    }
}
