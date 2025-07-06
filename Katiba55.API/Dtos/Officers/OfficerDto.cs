namespace Katiba55.API.Dtos.Officers
{
    public class OfficerDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public OfficerRanks Rank { get; set; }
        public OfficerStatus Status { get; set; }
        public DateTimeOffset JoinDate { get; set; }
        public DateTimeOffset? LeaveDate { get; set; }
        public string? Notes { get; set; }
    }
}
