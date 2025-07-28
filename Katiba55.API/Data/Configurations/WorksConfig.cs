using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Katiba55.API.Data.Configurations
{
    public class WorksConfig : IEntityTypeConfiguration<Work>
    {
        public void Configure(EntityTypeBuilder<Work> builder)
        {
            builder.HasMany(w => w.ExecutionHistories).WithOne(h => h.Work).HasForeignKey(h => h.WorkId).OnDelete(DeleteBehavior.Cascade);
            builder.HasMany(w => w.WorkCompanies).WithOne(wk => wk.Work).HasForeignKey(wk => wk.WorkId).OnDelete(DeleteBehavior.Cascade);
            builder.HasMany(w => w.BOQs).WithMany(bq => bq.Works);
        }
    }
}
