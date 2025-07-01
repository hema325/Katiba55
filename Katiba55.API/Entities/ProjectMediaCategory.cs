namespace Katiba55.API.Entities
{
    public class ProjectMediaCategory: BaseEntity
    {
        public string Name { get; set; }

        public ICollection<ProjectMedia> Medias { get; set; }
    }
}
