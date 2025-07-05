using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Katiba55.API.Data.Configurations
{
    public class ProjectMediasConfig : IEntityTypeConfiguration<ProjectMedia>
    {
        public void Configure(EntityTypeBuilder<ProjectMedia> builder)
        {
            builder.Property(p => p.Path).IsUnicode(false);
        }
    }
}
