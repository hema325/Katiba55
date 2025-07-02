using Microsoft.AspNetCore.Mvc;

namespace Katiba55.API.Controllers
{
    [Route("api")]
    [ApiController]
    public abstract class BaseController : ControllerBase
    {
        protected IActionResult Result<TData>(Result<TData> result)
            => result.Status switch 
            {
                StatusCodes.Status204NoContent => NoContent(),
                _=> StatusCode(result.Status, result)
            };
    }
}
