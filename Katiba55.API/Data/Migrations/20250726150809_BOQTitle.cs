using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Katiba55.API.Migrations
{
    /// <inheritdoc />
    public partial class BOQTitle : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "BOQs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Title",
                table: "BOQs");
        }
    }
}
