namespace Katiba55.API.Dtos.ProjectProgress
{
    public class CreateProjectProgressDto
    {
        public double ExecutionPercentage { get; set; }
        public DateTimeOffset Date { get; set; }
        public int ProjectId { get; set; }
    }
}
