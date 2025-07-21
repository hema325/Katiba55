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

        public DbSet<User> Users { get; private set; }
        public DbSet<Officer> Officers { get; private set; }
        public DbSet<Company> Companies { get; private set; }
        public DbSet<Project> Projects { get; private set; }
        public DbSet<ProjectExecutionHistory> ProjectExecutionHistories { get; private set; }
        public DbSet<Media> Medias { get; private set; }
        public DbSet<Work> Works { get; private set; }
        public DbSet<WorkExecutionHistory> WorkExecutionHistories { get; private set; }
        public DbSet<Item> Items { get; private set; }
        public DbSet<WorkItem> WorkItems { get; private set; }
    }
}
