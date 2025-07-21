namespace Katiba55.API.Dtos.Works
{
    public class WorkBriefDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal? ExecutionPercent { get; set; }
        public DateTime? ExecutionDate { get; set; }
        public string ExecutionStatus { get; set; }
    }
}
