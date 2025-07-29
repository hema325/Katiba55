using Katiba55.API.Dtos.Items;

namespace Katiba55.API.Dtos.Works
{
    public class WorkWithItemsBriefDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double? ExecutionPercent { get; set; }
        public DateTime? ExecutionDate { get; set; }
        public string ExecutionStatus { get; set; }

        public ICollection<ItemBriefDto> Items { get; set; }
    }
}
