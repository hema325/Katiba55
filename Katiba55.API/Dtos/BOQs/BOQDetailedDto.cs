using Katiba55.API.Dtos.Companies;
using Katiba55.API.Dtos.Contracts;
using Katiba55.API.Dtos.Works;

namespace Katiba55.API.Dtos.BOQs
{
    public class BOQDetailedDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Status { get; set; }
        public string Number { get; set; }
        public decimal? Value { get; set; }
        public CompanyBriefDto Company { get; set; }
        public ContractDetailedDto Contract { get; set; }
    }
}
