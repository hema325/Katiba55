using System.ComponentModel.DataAnnotations;

namespace Katiba55.API.Dtos.Works
{
    public class CreateWorkDto
    {
        public string Name { get; set; }
        public decimal TotalContractValue { get; set; }
        [EnumDataType(typeof(ExecutionStatus))]
        public string ExecutionStatus { get; set; }
        public int? ResponsibleId { get; set; }
        public int ProjectId { get; set; }
        public string? Notes { get; set; }
    }
}
