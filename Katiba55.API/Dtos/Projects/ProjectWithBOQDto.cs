using Katiba55.API.Dtos.BOQs;

namespace Katiba55.API.Dtos.Projects
{
    public class ProjectWithBOQDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<BOQDetailedDto> BOQs { get; set; } 
    }
}
