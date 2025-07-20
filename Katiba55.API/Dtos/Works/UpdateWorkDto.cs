using System.ComponentModel.DataAnnotations;

namespace Katiba55.API.Dtos.Works
{
    public class UpdateWorkDto
    {
        public string Name { get; set; }
        public double? ExecutionPercent { get; set; }
        public DateTime? ExecutionDate { get; set; }
        [EnumDataType(typeof(ExecutionStatus))]
        public string ExecutionStatus { get; set; }
        public int? ResponsibleId { get; set; }
        public string? Notes { get; set; }
    }
}
