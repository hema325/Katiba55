﻿using Katiba55.API.Dtos.ProjectMedias;
using Katiba55.API.Dtos.Projects;

namespace Katiba55.API.Profiles
{
    public class MediasProfile: Profile
    {
        public MediasProfile()
        {
            CreateMap<CreateMediaDto, Media>();
            CreateMap<Media, MediaDto>();
        }
    }
}
