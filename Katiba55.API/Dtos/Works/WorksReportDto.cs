namespace Katiba55.API.Dtos.Works
{
    public class WorksReportDto
    {
        public int TotalWorks { get; set; }
        public int PendingWorks { get; set; }
        public int OnHoldWorks { get; set; }
        public int UnderconstructionWorks { get; set; }
        public int CompletedWorks { get; set; }
        public int CancelledWorks { get; set; }

        public double TotalExecutionPercent { get; set; }
        public double AverageExecutionPercent
        {
            get
            {
                return TotalWorks > 0
                    ? Math.Round(TotalExecutionPercent / TotalWorks, 1)
                    : 0;
            }
        }

        public double StartPercent
        {
            get
            {
                var started = OnHoldWorks + UnderconstructionWorks + CompletedWorks;
                return TotalWorks > 0 ? Math.Round((double)started / TotalWorks * 100, 1) : 0;
            }
        }
    }
}
