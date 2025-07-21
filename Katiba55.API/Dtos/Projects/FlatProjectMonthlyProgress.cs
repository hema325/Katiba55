namespace Katiba55.API.Dtos.Projects
{
    public class FlatProjectMonthlyProgress
    {
        public string ProjectName { get; set; }
        public int Year { get; set; }
        public int Month { get; set; }
        public decimal Percentage { get; set; }
    }
}
