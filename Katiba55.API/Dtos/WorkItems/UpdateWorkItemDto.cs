using System.ComponentModel.DataAnnotations;

namespace Katiba55.API.Dtos.WorkItems
{
    public class UpdateWorkItemDto
    {
        public decimal TotalValue { get; set; }
        public decimal ExecutedValue { get; set; }

        [EnumDataType(typeof(ExecutionStatus))]
        public string ExecutionStatus { get; set; }
    }
}
