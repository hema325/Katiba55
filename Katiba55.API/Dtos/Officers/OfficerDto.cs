namespace Katiba55.API.Dtos.Officers
{
    public class OfficerDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public OfficerRanks Rank { get; set; }
        public OfficerStatus Status { get; set; }
        public DateTime? JoinDate { get; set; }
        public DateTime? LeaveDate { get; set; }
    }
}
