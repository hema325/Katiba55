using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Katiba55.API.Controllers
{
    [Route("/errors/{status}")]
    [ApiExplorerSettings(IgnoreApi = true)]
    public class ErrorsController : BaseController
    {
        public IActionResult Handle(int status)
            => Response(Result<Empty>.Create(status));
    }
}
