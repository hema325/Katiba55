using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Katiba55.API.Data.Configurations
{
    public class ProjectsConfig : IEntityTypeConfiguration<Project>
    {
        public void Configure(EntityTypeBuilder<Project> builder)
        {
            builder.HasIndex(p => p.Name).IsUnique();

            builder.HasOne(p => p.Supervisor).WithMany(c => c.Projects).HasForeignKey(p => p.SupervisorId).OnDelete(DeleteBehavior.Restrict);
            builder.HasMany(p => p.Works).WithOne(w => w.Project).HasForeignKey(w => w.ProjectId).OnDelete(DeleteBehavior.Cascade);
            builder.HasMany(p => p.ExecutionHistories).WithOne(h => h.Project).HasForeignKey(h => h.ProjectId).OnDelete(DeleteBehavior.Cascade);
            builder.HasMany(p => p.BOQs).WithOne(b => b.Project).HasForeignKey(b => b.ProjectId).OnDelete(DeleteBehavior.Restrict);
        }
    }
}
