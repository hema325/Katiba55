using Katiba55.API.Enums;

namespace Katiba55.API.Entities
{
    public class ProjectMedia: BaseEntity
    {
        public string Name { get; set; }
        public string Path { get; set; }
        public MediaTypes Type { get; set; }
        public DateTimeOffset UploadedDate { get; set; }
        public long ProjectMediaCategoryId { get; set; }
        public ProjectMediaCategory ProjectMediaCategory { get; set; }
        public long ProjectId { get; set; }
        public Project Project { get; set; }
    }
}
