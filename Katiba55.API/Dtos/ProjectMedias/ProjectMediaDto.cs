﻿namespace Katiba55.API.Dtos.ProjectMedias
{
    public class ProjectMediaDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Path { get; set; }
        public MediaTypes Type { get; set; }
        public DateTime? Date { get; set; }
    }
}
