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

            if (!_webHostEnv.IsDevelopment())
            {
                var response = ResultFactory.ServerError();
                
                httpContext.Response.StatusCode = StatusCodes.Status200OK;
                await httpContext.Response.WriteAsJsonAsync(response);

                return true;
            }

            httpContext.Response.StatusCode = StatusCodes.Status500InternalServerError;
            await httpContext.Response.WriteAsJsonAsync(new
            {
                Success = false,
                Status = 200,
                Message = errorMessage,
                Details = exception.StackTrace?.ToString()
            });

            return true;
        }
    }
}
