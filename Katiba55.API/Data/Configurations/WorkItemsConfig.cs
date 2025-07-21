using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Katiba55.API.Data.Configurations
{
    public class WorkItemsConfig : IEntityTypeConfiguration<WorkItem>
    {
        public void Configure(EntityTypeBuilder<WorkItem> builder)
        {
            builder.HasOne(wi => wi.Work).WithMany(w => w.WorkItems).HasForeignKey(wi => wi.WorkId).OnDelete(DeleteBehavior.Restrict);
            builder.HasOne(wi => wi.Item).WithMany(i => i.WorkItems).HasForeignKey(wi => wi.ItemId).OnDelete(DeleteBehavior.Cascade);
        }
    }
}
