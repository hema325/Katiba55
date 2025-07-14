using Azure;
using Microsoft.AspNetCore.Diagnostics;

namespace Katiba55.API.Handlers
{
    public class GlobalExceptionHandler : IExceptionHandler
    {
        private IWebHostEnvironment _webHostEnv;
        private ILogger<GlobalExceptionHandler> _logger;

        public GlobalExceptionHandler(IWebHostEnvironment webHostEnv, ILogger<GlobalExceptionHandler> logger)
        {
            _webHostEnv = webHostEnv;
            _logger = logger;
        }

        public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
        {
            var errorMessage = exception.InnerException?.Message ?? exception.Message;
            _logger.LogError("Exception ocurred: {message}", errorMessage);

            var response = ResultFactory.ServerError();

            if (_webHostEnv.IsDevelopment())
            {
                response.Message = errorMessage;
                response.Errors = [exception.StackTrace?.ToString()];
            }

            httpContext.Response.StatusCode = response.Status;
            await httpContext.Response.WriteAsJsonAsync(response);

            return true;
        }
    }
}
