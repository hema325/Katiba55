using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Katiba55.API.Data.Configurations
{
    public class ProjectProgressesConfig : IEntityTypeConfiguration<ProjectProgress>
    {
        public void Configure(EntityTypeBuilder<ProjectProgress> builder)
        {
            builder.HasOne(pp => pp.Project).WithMany(p => p.Progresses).HasForeignKey(pp => pp.ProjectId);
        }
    }
}
