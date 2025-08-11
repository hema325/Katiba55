namespace Katiba55.API.Dtos.BOQs
{
    public class UpdateBOQDto
    {
        public string Title { get; set; }
        public string Status { get; set; }
        public string Number { get; set; }
        public decimal? Value { get; set; }
        public int CompanyId { get; set; }
        public int? WorkId { get; set; }
    }
}
