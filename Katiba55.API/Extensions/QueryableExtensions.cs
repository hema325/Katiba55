using Microsoft.EntityFrameworkCore;

namespace Katiba55.API.Extensions
{
    public static class QueryableExtensions
    {
        public static async Task<PaginatedList<TEntity>> PaginateAsync<TEntity>(this IQueryable<TEntity> query, int pageNumber, int pageSize) where TEntity : BaseEntity
        {
            var data = await query.AsNoTracking().Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();
            var totalCount = await query.CountAsync();

            return new PaginatedList<TEntity>(data, pageNumber, pageSize, totalCount);
        }
    }
}
