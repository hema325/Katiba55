using Katiba55.API.Dtos.Projects;

namespace Katiba55.API.Profiles
{
    public class ProjectsProfile: Profile
    {
        public ProjectsProfile()
        {
            CreateMap<CreateProjectDto, Project>();
            CreateMap<UpdateProjectDto, Project>();
            CreateMap<Project, ProjectBriefDto>();
            CreateMap<Project, ProjectDto>();

            CreateMap<ProjectExecutionHistory, ProjectExecutionHistoryDto>();
        }
    }
}
