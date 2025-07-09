using Katiba55.API.Dtos.ProjectProgress;

namespace Katiba55.API.Dtos.Projects
{
    public class ProjectBriefDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double LastExecutionPercent { get; set; }
        public DateTime? LastExecutionDate { get; set; }
    }
}
