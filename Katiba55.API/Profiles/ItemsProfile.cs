using Katiba55.API.Dtos.Items;

namespace Katiba55.API.Profiles
{
    public class ItemsProfile: Profile
    {
        public ItemsProfile()
        {
            CreateMap<CreateItemDto, Item>();
            CreateMap<UpdateItemDto, Item>();
            CreateMap<Item, ItemDto>();
        }
    }
}
