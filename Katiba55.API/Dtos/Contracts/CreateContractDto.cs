namespace Katiba55.API.Dtos.Contracts
{
    public class CreateContractDto
    {
        public string Status { get; set; }
        public string? Number { get; set; }
        public double? Value { get; set; }

        public int BOQId { get; set; }
    }
}
