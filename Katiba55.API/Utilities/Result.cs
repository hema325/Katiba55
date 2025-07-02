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
        public static Result<TData> Create(int status)
            => new() 
            { 
                Status = status,
                Message = GetDefaultMessage(status)
            };


        public static Result<TData> Ok(TData data, string? message = null)
            => new()
            {
                Status = 200,
                Message = message ?? GetDefaultMessage(200),
                Data = data
            };

        public static Result<TData> NoContent(string? message = null)
            => new()
            {
                Status = 204,
                Message = message ?? GetDefaultMessage(204)
            };

        public static Result<TData> BadRequest(string[] errors, string? message = null)
            => new()
            {
                Status = 400,
                Message = message ?? GetDefaultMessage(400),
                Errors = errors
            };

        public static Result<TData> Unauthorized(string? message = null)
            => new()
            {
                Status = 401,
                Message = message ?? GetDefaultMessage(401)
            };

        public static Result<TData> Forbidden(string? message = null)
            => new()
            {
                Status = 403,
                Message = message ?? GetDefaultMessage(403)
            };

        public static Result<TData> NotFound(string? message = null)
            => new()
            {
                Status = 404,
                Message = message ?? GetDefaultMessage(404)
            };

        public static Result<TData> Conflict(string? message = null)
            => new()
            {
                Status = 409,
                Message = message ?? GetDefaultMessage(409)
            };

        public static Result<TData> ServerError(string? message = null)
            => new()
            {
                Status = 500,
                Message = message ?? GetDefaultMessage(500)
            };
        #endregion

        private static string? GetDefaultMessage(int status)
            => status switch
            {
                200 => "تمت العملية بنجاح.",
                204 => "تمت العملية بنجاح، ولا توجد بيانات للعرض.",
                400 => "فشل التحقق من البيانات. يرجى التحقق من المدخلات الخاصة بك.",
                401 => "غير مصرح لك بالوصول إلى هذا المورد.",
                403 => "ليس لديك إذن للوصول إلى هذا المورد.",
                404 => "المورد المطلوب غير موجود.",
                409 => "تعذر إتمام العملية المطلوبة بسبب تعارض.",
                500 => "واجه الخادم خطأ غير متوقع.",
                _ => null
            };
    }
}
