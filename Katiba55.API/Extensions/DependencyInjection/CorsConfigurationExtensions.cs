namespace Katiba55.API.Extensions.DependencyInjection
{
    public static class CorsConfigurationExtensions
    {
        public static IServiceCollection AddDefaultCors(this IServiceCollection services)
        {
            services.AddCors(o=>
            {
                o.AddDefaultPolicy(b =>
                {
                    b.AllowAnyOrigin();
                    b.AllowAnyHeader();
                    b.AllowAnyMethod();
                });
            });

            return services;
        }
    }
}
