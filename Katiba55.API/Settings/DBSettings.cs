namespace Katiba55.API.Settings
{
    public class DBSettings
    {
        public const string SectionName = "DataBase";

        public string Provider { get; set; }
        public string ConnectionString { get; set; }
    }
}
