namespace Katiba55.API.Entities
{
    public class Item: BaseEntity
    {
        public string Name { get; set; }

        public int ProjectId { get; set; }
        public Project Project { get; set; }

        public ICollection<WorkItem> WorkItems { get; set; }
    }
}
