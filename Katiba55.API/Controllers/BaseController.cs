using Microsoft.AspNetCore.Mvc;

namespace Katiba55.API.Controllers
{
    [Route("api")]
    [ApiController]
    public abstract class BaseController : ControllerBase
    {
        protected IActionResult Response<TData>(Result<TData> result)
            => Ok(result);          
    }
}
