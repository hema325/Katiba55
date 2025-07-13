using AutoMapper.QueryableExtensions;
using Katiba55.API.Data;
using Katiba55.API.Dtos.Items;
using Katiba55.API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Katiba55.API.Controllers
{
    [Route("api/items")]
    public class ItemsController : BaseController
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public ItemsController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateAsync(CreateItemDto dto)
        {
            var item = _mapper.Map<Item>(dto);

            _context.Items.Add(item);
            await _context.SaveChangesAsync();  

            return Response(ResultFactory.Ok(item.Id));
        }

        [HttpPut("{id}/update")]
        public async Task<IActionResult> UpdateAsync(int id, UpdateItemDto dto)
        {
            var item = await _context.Items.FindAsync(id);

            if (item == null)
                return Response(ResultFactory.NotFound());

            _mapper.Map(dto, item);

            _context.Items.Update(item);
            await _context.SaveChangesAsync();

            return Response(ResultFactory.Ok());
        }

        [HttpDelete("{id}/delete")]
        public async Task<IActionResult> DeleteAsync(int id, UpdateItemDto dto)
        {
            var item = await _context.Items.FindAsync(id);

            if (item == null)
                return Response(ResultFactory.NotFound());

            _context.Items.Remove(item);
            await _context.SaveChangesAsync();

            return Response(ResultFactory.Ok());
        }

        [HttpGet("{id}/getById")]
        public async Task<IActionResult> GetByIdAsync(int id)
        {
            var item = await _context.Items
                .ProjectTo<ItemDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(i => i.Id == id);

            if (item == null)
                return Response(ResultFactory.NotFound());

            return Response(ResultFactory.Ok(item));
        }

        [HttpGet("getByProjectId")]
        public async Task<IActionResult> GetByProjectIdAsync(int projectId)
        {
            var items = await _context.Items
                .Where(i => i.ProjectId == projectId)
                .ProjectTo<ItemDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

            return Response(ResultFactory.Ok(items));
        }
    }
}
