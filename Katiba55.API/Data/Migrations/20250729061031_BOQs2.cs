using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Katiba55.API.Migrations
{
    /// <inheritdoc />
    public partial class BOQs2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CompanyId",
                table: "BOQs",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_BOQs_CompanyId",
                table: "BOQs",
                column: "CompanyId");

            migrationBuilder.AddForeignKey(
                name: "FK_BOQs_Companies_CompanyId",
                table: "BOQs",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BOQs_Companies_CompanyId",
                table: "BOQs");

            migrationBuilder.DropIndex(
                name: "IX_BOQs_CompanyId",
                table: "BOQs");

            migrationBuilder.DropColumn(
                name: "CompanyId",
                table: "BOQs");
        }
    }
}
