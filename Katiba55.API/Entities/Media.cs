﻿namespace Katiba55.API.Entities
{
    public class Media: BaseEntity
    {
        public string Name { get; set; }
        public string Path { get; set; }
        public MediaTypes Type { get; set; }
        public DateTime? Date { get; set; }

        public int ProjectId { get; set; }
        public Project Project { get; set; }
    }
}
