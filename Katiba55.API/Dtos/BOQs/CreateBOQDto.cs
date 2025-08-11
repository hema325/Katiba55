namespace Katiba55.API.Dtos.BOQs
{
    public class CreateBOQDto
    {
        public string Title { get; set; }
        public string Status { get; set; }
        public string Number { get; set; }
        public decimal? Value { get; set; }
        public int? WorkId { get; set; }
        public int ProjectId { get; set; }
        public int CompanyId { get; set; }
    }
}
