using Katiba55.API.Dtos.Items;
using Katiba55.API.Dtos.WorkItems;

namespace Katiba55.API.Profiles
{
    public class ItemsProfile: Profile
    {
        public ItemsProfile()
        {
            CreateMap<CreateItemDto, Item>();
            CreateMap<UpdateItemDto, Item>();
            CreateMap<Item, ItemDto>();
            CreateMap<Item, ItemBriefDto>();
            CreateMap<Item, ItemDetailedDto>();
        }
    }
}
