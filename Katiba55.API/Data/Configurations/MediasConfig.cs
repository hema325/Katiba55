using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Katiba55.API.Data.Configurations
{
    public class MediasConfig : IEntityTypeConfiguration<Media>
    {
        public void Configure(EntityTypeBuilder<Media> builder)
        {
            builder.Property(p => p.Path).IsUnicode(false);
        }
    }
}
