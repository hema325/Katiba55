namespace Katiba55.API.Utilities
{
    public class Result<TData>
    {
        public bool Success => Status >= 200 & Status < 300;
        public int Status { get; set; } = 200;
        public string? Message { get; set; } = null;
        public string[]? Errors { get; set; } = null;
        public TData? Data { get; set; }

        public Result() { }
    }
}
