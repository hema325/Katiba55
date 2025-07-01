namespace Katiba55.API.Entities
{
    public class Officer: BaseEntity
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public DateTimeOffset JoinDate { get; set; }
        public DateTimeOffset LeaveDate { get; set; }
        public string Notes { get; set; }

        public ICollection<Project> Projects { get; set; }
    }
}
