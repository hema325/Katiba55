namespace Katiba55.API.Dtos.Officers
{
    public class OfficerBriefDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public OfficerStatus Status { get; set; }
        public OfficerRanks Rank { get; set; }
    }
}
