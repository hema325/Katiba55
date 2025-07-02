namespace Katiba55.API.Utilities
{
    public class PaginatedList<TEntity>
    {
        public PaginatedList(IReadOnlyList<TEntity> data, int pageNumber, int pageSize, int totalCount)
        {
            Data = data;
            PageNumber = pageNumber;
            PageSize = pageSize;
            TotalCount = totalCount;
        }

        public IReadOnlyList<TEntity> Data { get; set; }

        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public int TotalCount { get; set; }

        public int TotalPages => (int)Math.Ceiling((double)TotalCount / PageSize);
        public bool HasNextPage => PageNumber > 0 && PageNumber < TotalPages;
        public bool HasPreviousPage => PageNumber > 1 && PageNumber <= TotalPages;
    }
}
