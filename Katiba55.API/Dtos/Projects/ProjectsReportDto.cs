namespace Katiba55.API.Dtos.Projects
{
    public class ProjectsReportDto
    {
        public int TotalProjects { get; set; }
        public int PendingProjects { get; set; }
        public int OnHoldProjects { get; set; }
        public int UnderconstructionProjects { get; set; }
        public int CompletedProjects { get; set; }
        public int CancelledProjects { get; set; }

        public double TotalExecutionPercent { get; set; }
        public double AverageExecutionPercent
        {
            get
            {
                return TotalProjects > 0
                    ? Math.Round(TotalExecutionPercent / TotalProjects, 1)
                    : 0;
            }
        }

        public double StartPercent
        {
            get
            {
                var started = OnHoldProjects + UnderconstructionProjects + CompletedProjects;
                return TotalProjects > 0 ? Math.Round((double)started / TotalProjects * 100, 1) : 0;
            }
        }
    }
}
