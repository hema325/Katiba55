using Katiba55.API.Dtos.Projects;

namespace Katiba55.API.Profiles
{
    public class ProjectsProfile: Profile
    {
        public ProjectsProfile()
        {
            CreateMap<CreateProjectDto, Project>();
            CreateMap<UpdateProjectDto, Project>();

            CreateMap<Project, ProjectBriefDto>()
                .ForMember(dest => dest.LastProgreess, opt => opt.MapFrom(src => src.Progresses.OrderByDescending(p => p.Date).FirstOrDefault()));

            CreateMap<Project, ProjectDto>()
                .ForMember(dest => dest.LastProgreess, opt => opt.MapFrom(src => src.Progresses.OrderByDescending(p => p.Date).FirstOrDefault()));
        }
    }
}
