namespace Katiba55.API.Dtos.Companies
{
    public class CompanyFilterDto: PaginationFilter
    {
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
    }
}
