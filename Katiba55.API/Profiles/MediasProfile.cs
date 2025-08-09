using Katiba55.API.Dtos.Medias;
using Katiba55.API.Dtos.ProjectMedias;

namespace Katiba55.API.Profiles
{
    public class MediasProfile: Profile
    {
        public MediasProfile()
        {
            CreateMap<CreateMediaDto, Media>();
            CreateMap<UpdateMediaDto, Media>();
            CreateMap<Media, MediaDto>();
        }
    }
}
