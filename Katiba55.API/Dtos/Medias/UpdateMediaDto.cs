using System.ComponentModel.DataAnnotations;

namespace Katiba55.API.Dtos.Medias
{
    public class UpdateMediaDto
    {
        public string Name { get; set; }
        public string Path { get; set; }
        [EnumDataType(typeof(MediaTypes))]
        public string Type { get; set; }
        public string Category { get; set; }
        public double Size { get; set; }
        public DateTime? Date { get; set; }
    }
}
