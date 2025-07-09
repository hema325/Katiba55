using Katiba55.API.Dtos.Companies;
using Katiba55.API.Dtos.WorkItems;

namespace Katiba55.API.Dtos.Works
{
    public class WorkDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public double? ExecutionPercent { get; set; }
        public DateTime? ExecutionDate { get; set; }
        public int ProjectId { get; set; }
        public CompanyBriefDto? Responsible { get; set; }

        public ICollection<WorkItemDto> WorkItems { get; set; }
    }
}
