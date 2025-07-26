using Katiba55.API.Dtos.Advances;

namespace Katiba55.API.Profiles
{
    public class AdvancesProfile: Profile
    {
        public AdvancesProfile()
        {
            CreateMap<CreateAdvanceDto, Advance>();
            CreateMap<UpdateAdvanceDto, Advance>();
            CreateMap<Advance, AdvanceDto>();
        }
    }
}
