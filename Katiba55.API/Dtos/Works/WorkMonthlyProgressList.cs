namespace Katiba55.API.Dtos.Works
{
    public class WorkMonthlyProgressList
    {
        public string WorkName { get; set; }
        public IEnumerable<WorkMonthlyProgressItem> Items { get; set; }
    }
}
