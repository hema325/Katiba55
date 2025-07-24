using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Katiba55.API.Data.Configurations
{
    public class ItemsConfig : IEntityTypeConfiguration<Item>
    {
        public void Configure(EntityTypeBuilder<Item> builder)
        {
            builder.HasOne(wi => wi.Work).WithMany(w => w.Items).HasForeignKey(wi => wi.WorkId).OnDelete(DeleteBehavior.Cascade);
        }
    }
}
