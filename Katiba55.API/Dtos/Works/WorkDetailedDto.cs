using Katiba55.API.Dtos.Companies;
using Katiba55.API.Dtos.WorkItems;

namespace Katiba55.API.Dtos.Works
{
    public class WorkDetailedDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal TotalContractValue { get; set; }
        public decimal? ExecutionPercent { get; set; }
        public DateTime? ExecutionDate { get; set; }
        public string ExecutionStatus { get; set; }
        public string? Notes { get; set; }
        public CompanyBriefDto? Responsible { get; set; }
        public ICollection<WorkItemDto> WorkItems { get; set; }
    }
}
