namespace Katiba55.API.Entities
{
    public class User: BaseEntity
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string HashedPassword { get; set; }
        public DateTimeOffset? LastLoginDate { get; set; }
        public DateTimeOffset CreationDate { get; set; }
        public bool IsBlocked { get; set; }
    }
}
