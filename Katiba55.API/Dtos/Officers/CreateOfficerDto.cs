using System.ComponentModel.DataAnnotations;

namespace Katiba55.API.Dtos.Officers
{
    public class CreateOfficerDto
    {
        public string Name { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        [EnumDataType(typeof(OfficerRanks))]
        public string Rank { get; set; }
        [EnumDataType(typeof(OfficerStatus))]
        public string Status { get; set; }
        public DateTime? JoinDate { get; set; }
        public DateTime? LeaveDate { get; set; }
        public string? Notes { get; set; }
    }
}
