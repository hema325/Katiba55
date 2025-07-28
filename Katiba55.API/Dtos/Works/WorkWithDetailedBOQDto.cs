using Katiba55.API.Dtos.BOQs;
using Katiba55.API.Dtos.Companies;

namespace Katiba55.API.Dtos.Works
{
    public class WorkWithDetailedBOQDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<BOQDetailedDto> BOQs { get; set; }
    }
}
