﻿using Katiba55.API.Dtos.Items;

namespace Katiba55.API.Dtos.WorkItems
{
    public class WorkItemDto
    {
        public int Id { get; set; }
        public double? ExecutionPercent { get; set; }
        public DateTime? ExecutionDate { get; set; }
        public int WorkId { get; set; }
        public int ItemId { get; set; }
        public ItemDto Item { get; set; }
    }
}
