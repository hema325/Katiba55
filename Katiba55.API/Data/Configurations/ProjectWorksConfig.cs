using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Katiba55.API.Data.Configurations
{
    public class ProjectWorksConfig : IEntityTypeConfiguration<ProjectWork>
    {
        public void Configure(EntityTypeBuilder<ProjectWork> builder)
        {
            builder.HasIndex(pw => pw.Name).IsUnique();

            builder.HasOne(p => p.Responsible).WithMany(c => c.Works).HasForeignKey(w => w.ResponsibleId);
            builder.HasOne(p => p.Project).WithMany(p => p.Works).HasForeignKey(w => w.ResponsibleId);
        }
    }
}
