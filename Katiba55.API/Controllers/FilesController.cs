using Microsoft.AspNetCore.Mvc;

namespace Katiba55.API.Controllers
{
    [Route("api/files")]
    public class FilesController : BaseController
    {
        [HttpPost("upload")]
        public async Task<IActionResult> UploadAsync([FromForm] IFormFile file)
        {
            var fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
            var fileType = file.ContentType.Substring(0, file.ContentType.IndexOf('/'));
            var filePath = Path.Combine("Files", fileType + "s", fileName);

            var directoryPath = Path.GetDirectoryName(filePath);
            if (!Directory.Exists(directoryPath))
            {
                Directory.CreateDirectory(directoryPath);
            }

            using (var fileStream = System.IO.File.Create(filePath))
            {
                await file.CopyToAsync(fileStream);
            }

            return Response(ResultFactory.Ok(filePath));
        }
    }
}
