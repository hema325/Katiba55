namespace Katiba55.API.Dtos.Works
{
    public class WorkDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal TotalContractValue { get; set; }
        public decimal? ExecutionPercent { get; set; }
        public DateTime? ExecutionDate { get; set; }
        public string ExecutionStatus { get; set; }
        public string? Notes { get; set; }
        public int? ResponsibleId { get; set; }
        public int ProjectId { get; set; }
    }
}
