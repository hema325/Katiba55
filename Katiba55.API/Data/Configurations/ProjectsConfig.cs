using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Katiba55.API.Data.Configurations
{
    public class ProjectsConfig : IEntityTypeConfiguration<Project>
    {
        public void Configure(EntityTypeBuilder<Project> builder)
        {
            builder.Property(p => p.PosterPath).IsUnicode(false);
            builder.HasIndex(p => p.Name).IsUnique();

            builder.HasOne(p => p.Supervisor).WithMany(s => s.Projects).HasForeignKey(p => p.SupervisorId);
            builder.HasMany(p => p.ProjectExecutionProgresses).WithOne(ep=> ep.Project).HasForeignKey(p => p.ProjectId);
            builder.HasMany(p => p.ProjectMedias).WithOne(pm => pm.Project).HasForeignKey(p => p.ProjectId);
            builder.HasMany(p=>p.ProjectCompanies).WithOne(pc=>pc.Project).HasForeignKey(pc => pc.ProjectId);
        }
    }
}
