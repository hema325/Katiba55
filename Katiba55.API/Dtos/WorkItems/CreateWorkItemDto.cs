using System.ComponentModel.DataAnnotations;

namespace Katiba55.API.Dtos.WorkItems
{
    public class CreateWorkItemDto
    {
        public decimal TotalValue { get; set; }
        public decimal ExecutedValue { get; set; }

        [EnumDataType(typeof(ExecutionStatus))]
        public string ExecutionStatus { get; set; }
        public int WorkId { get; set; }
        public int ItemId { get; set; }
    }
}
