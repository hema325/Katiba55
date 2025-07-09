namespace Katiba55.API.Dtos.Works
{
    public class CreateWorkDto
    {
        public string Name { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public double? ExecutionPercent { get; set; }
        public DateTime? ExecutionDate { get; set; }
        public int? ResponsibleId { get; set; }
        public int ProjectId { get; set; }
    }
}
