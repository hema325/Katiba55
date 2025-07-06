using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Katiba55.API.Data.Configurations
{
    public class CompaniesConfig : IEntityTypeConfiguration<Company>
    {
        public void Configure(EntityTypeBuilder<Company> builder)
        {
            builder.Property(p => p.SecurityApprovalPath).IsUnicode(false);
            builder.HasIndex(p => p.Name).IsUnique();
            builder.HasIndex(p => p.Email).IsUnique();
            builder.HasIndex(p => p.Phone).IsUnique();

            builder.HasMany(c => c.ProjectCompanies).WithOne(pc => pc.Company).HasForeignKey(pc => pc.CompanyId);
        }
    }
}
