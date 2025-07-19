namespace Katiba55.API.Dtos.Projects
{
    public class ProjectMonthlyProgressList
    {
        public string ProjectName { get; set; }
        public IEnumerable<ProjectMonthlyProgressItem> Items { get; set; }
    }
}
