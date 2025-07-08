using System.ComponentModel.DataAnnotations;

namespace Katiba55.API.Dtos.Officers
{
    public class UpdateOfficerDto
    {
        public string Name { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        [EnumDataType(typeof(OfficerRanks))]
        public OfficerRanks Rank { get; set; }
        public OfficerStatus Status { get; set; }
        public DateTimeOffset? JoinDate { get; set; }
        public DateTimeOffset? LeaveDate { get; set; }
    }
}
