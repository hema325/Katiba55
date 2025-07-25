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

        public decimal TotalExecutionPercent { get; set; }
        public decimal AverageExecutionPercent
        {
            get
            {
                return TotalProjects > 0
                    ? Math.Round(TotalExecutionPercent / TotalProjects, 1)
                    : 0;
            }
        }

        public decimal StartPercent
        {
            get
            {
                var started = OnHoldProjects + UnderconstructionProjects + CompletedProjects;
                return TotalProjects > 0 ? Math.Round((decimal)started / TotalProjects * 100, 1) : 0;
            }
        }
    }
}
