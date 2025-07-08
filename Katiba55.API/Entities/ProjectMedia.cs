namespace Katiba55.API.Entities
{
    public class ProjectMedia: BaseEntity
    {
        public string Name { get; set; }
        public string Path { get; set; }
        public MediaTypes Type { get; set; }

        public int ProjectId { get; set; }
        public Project Project { get; set; }
    }
}
