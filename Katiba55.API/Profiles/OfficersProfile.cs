using Katiba55.API.Dtos.Officers;

namespace Katiba55.API.Profiles
{
    public class OfficersProfile: Profile
    {
        public OfficersProfile()
        {
            CreateMap<CreateOfficerDto, Officer>();
            CreateMap<UpdateOfficerDto, Officer>();
            CreateMap<Officer, OfficerBriefDto>();
            CreateMap<Officer, OfficerDto>();
        }
    }
}
