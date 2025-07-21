using Katiba55.API.Dtos.Items;

namespace Katiba55.API.Dtos.WorkItems
{
    public class WorkItemDetailedDto
    {
        public int Id { get; set; }
        public decimal TotalValue { get; set; }
        public decimal ExecutedValue { get; set; }
        public decimal RelativeWeight { get; set; } // calculated
        public decimal ExecutionPercent { get; set; } // calculated
        public DateTime ExecutionDate { get; set; } // calculated
        public string ExecutionStatus { get; set; }
        public ItemDto Item { get; set; }
    }
}
