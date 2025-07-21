namespace Katiba55.API.Dtos.ProjectMedias
{
    public class MediaDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Path { get; set; }
        public string Type { get; set; }
        public DateTime? Date { get; set; }
        public string Category { get; set; }
        public double Size { get; set; }
        public bool ShowInExecutionStatusPage { get; set; }
    }
}
