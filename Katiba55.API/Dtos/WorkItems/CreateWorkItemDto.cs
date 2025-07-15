using System.ComponentModel.DataAnnotations;

namespace Katiba55.API.Dtos.WorkItems
{
    public class CreateWorkItemDto
    {
        public double? ExecutionPercent { get; set; }
        public DateTime? ExecutionDate { get; set; }
        [EnumDataType(typeof(ExecutionStatus))]
        public string ExecutionStatus { get; set; }
        public int WorkId { get; set; }
        public int ItemId { get; set; }
    }
}
