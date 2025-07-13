using AutoMapper.QueryableExtensions;
using Katiba55.API.Data;
using Katiba55.API.Dtos.ProjectMedias;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Katiba55.API.Controllers
{
    [Route("api/medias")]
    public class MediasController: BaseController
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public MediasController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateAsync(CreateProjectMediaDto dto)
        {
            var supportedImageExtensions = new[] { ".jpg", ".jpeg", ".png", ".svg", ".gif", ".bmp", ".webp", ".tiff" };
            var supportedVideosExtensions = new[] { ".mp4", ".avi", ".mov", ".wmv", ".flv", ".mkv", ".webm" };
            var fileExtension = Path.GetExtension(dto.Path);
            var media = new Media();

            if (supportedImageExtensions.Any(ex => ex == fileExtension))
            {
                media.Type = MediaTypes.Image;
            }
            else if(supportedVideosExtensions.Any(ex => ex == fileExtension))
            {
                media.Type = MediaTypes.Video;
            }
            else
            {
                return Response(ResultFactory.BadRequest(message: "هذا الملف غير مدعوم."));
            }

            _mapper.Map(dto, media);

            _context.Medias.Add(media);
            await _context.SaveChangesAsync();

            return Response(ResultFactory.Ok(media.Id));
        }

        [HttpDelete("{mediaId}/delete")]
        public async Task<IActionResult> DeleteAsync(int mediaId)
        {
            var media = await _context.Medias.FirstOrDefaultAsync(m => m.Id == mediaId);

            if (media == null)
                return Response(ResultFactory.NotFound());

            try
            {
                if(System.IO.File.Exists(media.Path))
                    System.IO.File.Delete(media.Path);
            }
            catch
            {
                return Response(ResultFactory.BadRequest(message: "حدث خطأ أثناء حذف الملف. يرجى المحاولة مرة أخرى."));
            }

            _context.Medias.Remove(media);
            await _context.SaveChangesAsync();

            return Response(ResultFactory.Ok());
        }

        [HttpGet("getByProjectId")]
        public async Task<IActionResult> GetByProjectIdAsync([FromQuery] int projectId)
        {
            var medias = await _context.Medias
                .Where(m => m.ProjectId == projectId)
                .ProjectTo<ProjectMediaDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

            return Response(ResultFactory.Ok(medias));
        }
    }
}
