using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using System.Reflection;

namespace Katiba55.API.Data
{
    public class ApplicationDbContext: DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options): base(options)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }

        public DbSet<Officer> Users { get; private set; }
        public DbSet<Officer> Officers { get; private set; }
        public DbSet<Company> Companies { get; private set; }
        public DbSet<Project> Projects { get; private set; }
        public DbSet<ProjectCompany> ProjectCompanies { get; private set; }
        public DbSet<ProjectMedia> ProjectMedias { get; private set; }
        public DbSet<ProjectMediaCategory> ProjectMediaCategories { get; private set; }
        public DbSet<ProjectExecutionProgress> ProjectExecutionHistory { get; private set; }
    }
}
