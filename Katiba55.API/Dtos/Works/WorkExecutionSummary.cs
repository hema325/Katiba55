namespace Katiba55.API.Dtos.Works
{
    public class WorkExecutionSummary
    {
        public ICollection<string> Items { get; set; }
        public ICollection<WorkWithItemsBriefDto> Works { get; set; }
    }
}
