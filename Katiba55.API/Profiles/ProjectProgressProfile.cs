using Katiba55.API.Dtos.ProjectProgress;

namespace Katiba55.API.Profiles
{
    public class ProjectProgressProfile: Profile
    {
        public ProjectProgressProfile()
        {
            CreateMap<CreateProjectProgressDto, ProjectProgress>();
            CreateMap<UpdateProjectProgressDto, ProjectProgress>();
            CreateMap<ProjectProgress, ProjectProgressDto>();
        }
    }
}
