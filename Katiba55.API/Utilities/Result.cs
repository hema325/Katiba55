namespace Katiba55.API.Utilities
{
    public class Result<TData>
    {
        public int Status { get; private set; }
        public string? Message { get; private set; } = null;
        public string[]? Errors { get; private set; } = null;
        public TData? Data { get; private set; }

        private Result() { }

        #region factory methods
        public static Result<TData> Ok(TData data, string? message = null)
            => new()
            {
                Status = StatusCodes.Status200OK,
                Message = message,
                Data = data
            };

        public static Result<TData> BadRequest(string[] errors, string? message = null)
            => new()
            {
                Status = StatusCodes.Status400BadRequest,
                Message = message,
                Errors = errors
            };

        public static Result<TData> NotFound(string? message = null)
            => new()
            {
                Status = StatusCodes.Status404NotFound,
                Message = message
            };

        public static Result<TData> Conflict(string? message = null)
            => new()
            {
                Status = StatusCodes.Status409Conflict,
                Message = message
            };

        public static Result<TData> Unauthorized(string? message = null)
            => new()
            {
                Status = StatusCodes.Status401Unauthorized,
                Message = message
            };

        public static Result<TData> Forbidden(string? message = null)
            => new()
            {
                Status = StatusCodes.Status403Forbidden,
                Message = message
            };

        public static Result<TData> NoContent(string? message = null)
            => new()
            {
                Status = StatusCodes.Status204NoContent,
                Message = message
            };
        #endregion
    }
}
