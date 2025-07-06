namespace Katiba55.API.Dtos.Officers
{
    public class OfficerFilterDto: PaginationFilter
    {
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public OfficerRanks? Rank { get; set; }
        public OfficerStatus? Status { get; set; }
    }
}
