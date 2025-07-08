using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Katiba55.API.Data.Configurations
{
    public class ProjectsConfig : IEntityTypeConfiguration<Project>
    {
        public void Configure(EntityTypeBuilder<Project> builder)
        {
            builder.HasIndex(p => p.Name).IsUnique();

            builder.HasOne(p => p.Supervisor).WithMany(p => p.Projects).HasForeignKey(p => p.SupervisorId);
        }
    }
}
