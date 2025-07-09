using Katiba55.API.Dtos.Works;

namespace Katiba55.API.Profiles
{
    public class WorksProfile: Profile
    {
        public WorksProfile()
        {
            CreateMap<CreateWorkDto, Work>();
            CreateMap<UpdateWorkDto, Work>();
            CreateMap<Work, WorkDto>();

            CreateMap<WorkExecutionHistory, WorkExecutionHistoryDto>();
        }
    }
}
