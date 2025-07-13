using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Katiba55.API.Migrations
{
    /// <inheritdoc />
    public partial class MediaCategory : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Category",
                table: "Medias",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Category",
                table: "Medias");
        }
    }
}
