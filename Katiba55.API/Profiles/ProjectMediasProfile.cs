using Katiba55.API.Dtos.ProjectMedias;
using Katiba55.API.Dtos.Projects;

namespace Katiba55.API.Profiles
{
    public class ProjectMediasProfile: Profile
    {
        public ProjectMediasProfile()
        {
            CreateMap<CreateProjectMediaDto, Media>();
            CreateMap<Media, ProjectMediaDto>();
        }
    }
}
