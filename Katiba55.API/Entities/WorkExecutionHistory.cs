namespace Katiba55.API.Entities
{
    public class WorkExecutionHistory: BaseEntity
    {
        public double Percentage { get; set; }
        public DateTime Date { get; set; }

        public int WorkId { get; set; }
        public Work Work { get; set; }
    }
}
