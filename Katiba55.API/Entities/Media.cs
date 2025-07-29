namespace Katiba55.API.Entities
{
    public class Media: BaseEntity
    {
        public string Name { get; set; }
        public string Path { get; set; }
        public MediaTypes Type { get; set; }
        public DateTime? Date { get; set; }
        public string Category { get; set; }
        public double Size { get; set; } 
        public bool ShowInExecutionStatusPage { get; set; }

        public MediaReferenceTypes ReferenceType { get; set; }
        public int ReferenceId { get; set; }
    }
}
