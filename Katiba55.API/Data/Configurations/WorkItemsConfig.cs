using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Katiba55.API.Data.Configurations
{
    public class WorkItemsConfig : IEntityTypeConfiguration<ProjectWorkItem>
    {
        public void Configure(EntityTypeBuilder<ProjectWorkItem> builder)
        {
            builder.HasOne(i => i.Work).WithMany(w => w.Items).HasForeignKey(i => i.WorkId);
        }
    }
}
