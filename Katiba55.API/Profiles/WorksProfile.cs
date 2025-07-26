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
            CreateMap<Work, WorkBriefDto>();
            CreateMap<Work, WorkDetailedDto>();
            CreateMap<Work, WorkDetailedWithItems>();
            CreateMap<Work, WorkWithItemsBriefDto>();
            CreateMap<Work, WorkWithDetailedBOQDto>();

            CreateMap<WorkExecutionHistory, WorkExecutionHistoryDto>();
        }
    }
}
