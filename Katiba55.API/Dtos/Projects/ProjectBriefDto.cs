namespace Katiba55.API.Dtos.Projects
{
    public class ProjectBriefDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double? ExecutionPercent { get; set; }
        public DateTime? ExecutionDate { get; set; }
        public string ExecutionStatus { get; set; }
    }
}
