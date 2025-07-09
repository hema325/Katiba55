using System.ComponentModel.DataAnnotations;

namespace Katiba55.API.Dtos.ProjectMedias
{
    public class CreateProjectMediaDto
    {
        public string Name { get; set; }
        public string Path { get; set; }
        public int ProjectId { get; set; }
        public DateTime? Date { get; set; }
    }
}
