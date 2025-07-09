using Katiba55.API.Dtos.ProjectProgress;

namespace Katiba55.API.Profiles
{
    public class ProjectProgressProfile: Profile
    {
        public ProjectProgressProfile()
        {
            CreateMap<CreateProjectProgressDto, ProjectExecutionHistory>();
            CreateMap<UpdateProjectProgressDto, ProjectExecutionHistory>();
            CreateMap<ProjectExecutionHistory, ProjectProgressDto>();
        }
    }
}
