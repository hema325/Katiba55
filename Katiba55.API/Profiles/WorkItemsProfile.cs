using Katiba55.API.Dtos.WorkItems;

namespace Katiba55.API.Profiles
{
    public class WorkItemsProfile: Profile
    {
        public WorkItemsProfile()
        {
            CreateMap<CreateWorkItemDto, WorkItem>();
            CreateMap<UpdateWorkItemDto, WorkItem>();
            CreateMap<WorkItem, WorkItemDto>();

            CreateMap<WorkItemExecutionHistory, WorkItemExecutionHistoryDto>();
        }
    }
}
