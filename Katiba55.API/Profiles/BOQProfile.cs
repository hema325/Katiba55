using Katiba55.API.Dtos.BOQs;

namespace Katiba55.API.Profiles
{
    public class BOQProfile: Profile
    {
        public BOQProfile()
        {
            CreateMap<CreateBOQDto, BOQ>();
            CreateMap<UpdateBOQDto, BOQ>();
            CreateMap<BOQ, BOQDto>();
            CreateMap<BOQ, BOQDetailedDto>();
            CreateMap<BOQ, BOQWithContractDto>();
        }
    }
}
