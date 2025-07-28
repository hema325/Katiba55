using Katiba55.API.Dtos.Contracts;

namespace Katiba55.API.Dtos.BOQs
{
    public class BOQDetailedDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Status { get; set; }
        public string Number { get; set; }
        public decimal? Value { get; set; }
        public ContractDetailedDto Contract { get; set; }
    }
}
