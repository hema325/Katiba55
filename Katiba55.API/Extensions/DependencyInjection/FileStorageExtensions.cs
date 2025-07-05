using Microsoft.Extensions.FileProviders;

namespace Katiba55.API.Extensions.DependencyInjection
{
    public static class FileStorageExtensions
    {
        public static IApplicationBuilder UseFileStorage(this IApplicationBuilder app) {

            app.UseStaticFiles();
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "Files")),
                RequestPath = "/Files"
            });

            return app;
        }
    }
}
