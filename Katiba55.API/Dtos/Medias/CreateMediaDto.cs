using System.ComponentModel.DataAnnotations;

namespace Katiba55.API.Dtos.ProjectMedias
{
    public class CreateMediaDto
    {
        public string Name { get; set; }
        public string Path { get; set; }
        [EnumDataType(typeof(MediaTypes))]
        public string Type { get; set; }
        [EnumDataType(typeof(MediaCategories))]
        public string Category { get; set; }
        public double Size { get; set; }
        public DateTime? Date { get; set; }
        [EnumDataType(typeof(MediaReferenceTypes))]

        public string ReferenceType { get; set; }
        public int ReferenceId { get; set; }
    }
}
