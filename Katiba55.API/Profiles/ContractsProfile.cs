using Katiba55.API.Dtos.Contracts;

namespace Katiba55.API.Profiles
{
    public class ContractsProfile: Profile
    {
        public ContractsProfile()
        {
            CreateMap<CreateContractDto, Contract>();
            CreateMap<UpdateContractDto, Contract>();
            CreateMap<Contract, ContractDto>();
            CreateMap<Contract, ContractDetailedDto>();
        }
    }
}
