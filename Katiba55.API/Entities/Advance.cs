using Microsoft.Identity.Client;

namespace Katiba55.API.Entities
{
    public class Advance : BaseEntity
    {
        public string Status { get; set; }
        public decimal Percent { get; set; }
        public decimal Value { get; set; }

        public int ContractId { get; set; }
        public Contract Contract {get;set;}
    }
}
