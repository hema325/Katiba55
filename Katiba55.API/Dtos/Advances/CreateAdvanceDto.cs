namespace Katiba55.API.Dtos.Advances
{
    public class CreateAdvanceDto
    {
        public string Status { get; set; }
        public decimal Percent { get; set; }
        public decimal Value { get; set; }

        public int ContractId { get; set; }
    }
}
