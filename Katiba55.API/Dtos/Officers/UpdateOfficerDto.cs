﻿using System.ComponentModel.DataAnnotations;

namespace Katiba55.API.Dtos.Officers
{
    public class UpdateOfficerDto
    {
        public string Name { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        [EnumDataType(typeof(OfficerRanks))]
        public OfficerRanks Rank { get; set; }
        [EnumDataType(typeof(OfficerStatus))]
        public OfficerStatus Status { get; set; }
        public DateTime? JoinDate { get; set; }
        public DateTime? LeaveDate { get; set; }
    }
}
