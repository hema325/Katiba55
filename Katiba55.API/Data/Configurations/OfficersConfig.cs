using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Katiba55.API.Data.Configurations
{
    public class OfficersConfig : IEntityTypeConfiguration<Officer>
    {
        public void Configure(EntityTypeBuilder<Officer> builder)
        {
            builder.HasIndex(p => p.Name).IsUnique();
        }
    }
}
