using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Katiba55.API.Data.Configurations
{
    public class BOQConfig : IEntityTypeConfiguration<BOQ>
    {
        public void Configure(EntityTypeBuilder<BOQ> builder)
        {
            //builder.HasIndex(b=>b.Number).IsUnique();
        }
    }
}
