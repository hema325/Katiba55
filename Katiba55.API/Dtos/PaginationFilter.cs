namespace Katiba55.API.Dtos
{
    public class PaginationFilter
    {
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = int.MaxValue;
    }
}
