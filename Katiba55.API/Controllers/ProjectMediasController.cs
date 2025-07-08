using AutoMapper.QueryableExtensions;
using Katiba55.API.Data;
using Katiba55.API.Dtos.ProjectMedias;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Katiba55.API.Controllers
{
    [Route("api/projects/{projectId}/medias")]
    public class ProjectMediasController: BaseController
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public ProjectMediasController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateAsync(int projectId, CreateProjectMediaDto dto)
        {
            var supportedImageExtensions = new[] { ".jpg", ".jpeg", ".png", ".svg", ".gif", ".bmp", ".webp", ".tiff" };
            var supportedVideosExtensions = new[] { ".mp4", ".avi", ".mov", ".wmv", ".flv", ".mkv", ".webm" };
            var fileExtension = Path.GetExtension(dto.Path);
            var media = new ProjectMedia { ProjectId = projectId };

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

            _context.ProjectMedias.Add(media);
            await _context.SaveChangesAsync();

            return Response(ResultFactory.Ok(media.Id));
        }

        [HttpDelete("{mediaId}/delete")]
        public async Task<IActionResult> DeleteAsync(int projectId, int mediaId)
        {
            var media = await _context.ProjectMedias.FirstOrDefaultAsync(m => m.Id == mediaId && m.ProjectId == projectId);

            if (media == null)
                return Response(ResultFactory.NotFound());

            try
            {
                System.IO.File.Delete(media.Path);
            }
            catch
            {
                return Response(ResultFactory.BadRequest(message: "حدث خطأ أثناء حذف الملف. يرجى المحاولة مرة أخرى."));
            }

            _context.ProjectMedias.Remove(media);
            await _context.SaveChangesAsync();

            return Response(ResultFactory.NoContent());
        }

        [HttpGet("getAll")]
        public async Task<IActionResult> GetAllAsync(int projectId)
        {
            var medias = await _context.ProjectMedias
                .Where(m => m.ProjectId == projectId)
                .ProjectTo<ProjectMediaDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

            return Response(ResultFactory.Ok(medias));
        }
    }
}
