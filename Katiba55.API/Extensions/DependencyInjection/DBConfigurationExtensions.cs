using Katiba55.API.Data;
using Katiba55.API.Settings;
using Microsoft.EntityFrameworkCore;
using System.Runtime;

namespace Katiba55.API.Extensions.DependencyInjection
{
    public static class DBConfigurationExtensions
    {
        public static IServiceCollection ConfigureDB(this IServiceCollection services, IConfiguration config)
        {
            var settings = config.GetSection(DBSettings.SectionName).Get<DBSettings>();

            services.AddDbContext<ApplicationDbContext>(opt =>
            {
                var provider = settings.Provider.ToLower();

                if (provider == "sqlite")
                {
                    opt.UseSqlite(settings.ConnectionString);
                }
                else if(provider == "sqlserver")
                {
                    opt.UseSqlServer(settings.ConnectionString);
                }
            });

            return services;
        }
    }
}
