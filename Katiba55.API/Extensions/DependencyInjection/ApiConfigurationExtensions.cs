
using Microsoft.AspNetCore.Mvc;

namespace Katiba55.API.Extensions.DependencyInjection
{
    public static class ApiConfigurationExtensions
    {
        public static IServiceCollection ConfigureApiBehaviorOptions(this IServiceCollection services)
        {
            services.Configure<ApiBehaviorOptions>(o =>
            {
                o.InvalidModelStateResponseFactory = context => 
                {
                    var errors = context.ModelState.Values
                    .SelectMany(entry => entry.Errors)
                    .Select(err => err.ErrorMessage)
                    .ToArray();

                    return new BadRequestObjectResult(ResultFactory.BadRequest(errors));
                };
            });

            return services;
        }
    }
}
