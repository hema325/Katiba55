namespace Katiba55.API.Entities
{
    public class ExecutionPercentageHistory: BaseEntity
    {
        public double Percentage { get; set; }
        public DateTimeOffset Date { get; set; }

        public long ProjectId { get; set; }
        public Project Project { get; set; }
    }
}
