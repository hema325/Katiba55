using Katiba55.API.Dtos.Invoices;

namespace Katiba55.API.Profiles
{
    public class InvoicesProfile: Profile
    {
        public InvoicesProfile()
        {
            CreateMap<CreateInvoiceDto, Invoice>();
            CreateMap<UpdateInvoiceDto, Invoice>();
            CreateMap<Invoice, InvoiceDto>();
        }
    }
}
