using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Katiba55.API.Data.Configurations
{
    public class CompaniesConfig : IEntityTypeConfiguration<Company>
    {
        public void Configure(EntityTypeBuilder<Company> builder)
        {
            builder.Property(p => p.ApprovalImagePath).IsUnicode(false);
            builder.HasIndex(p => p.Name).IsUnique();

            builder.HasMany(c => c.WorkCompanies).WithOne(wk => wk.Company).HasForeignKey(wk => wk.CompanyId).OnDelete(DeleteBehavior.Cascade);
            builder.HasMany(c => c.BOQs).WithOne(boq => boq.Company).HasForeignKey(boq => boq.CompanyId).OnDelete(DeleteBehavior.Cascade);
        }
    }
}
