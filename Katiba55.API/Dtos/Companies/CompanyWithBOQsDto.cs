using Katiba55.API.Dtos.BOQs;

namespace Katiba55.API.Dtos.Companies
{
    public class CompanyWithBOQsDto
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public ICollection<BOQWithContractDto> BOQs { get; set; }
    }
}
