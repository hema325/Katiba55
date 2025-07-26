using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Katiba55.API.Data.Configurations
{
    public class ContractConfig : IEntityTypeConfiguration<Contract>
    {
        public void Configure(EntityTypeBuilder<Contract> builder)
        {
            builder.HasIndex(c => c.Number).IsUnique();

            builder.HasOne(c => c.BOQ).WithOne(b => b.Contract).HasForeignKey<Contract>(c => c.BOQId);
            builder.HasMany(c => c.Invoices).WithOne(i => i.Contract).HasForeignKey(i => i.ContractId);
            builder.HasMany(c => c.Advances).WithOne(a => a.Contract).HasForeignKey(a => a.ContractId);
        }
    }
}
