using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Katiba55.API.Migrations
{
    /// <inheritdoc />
    public partial class ProjectWorkResponsibleNullable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProjectWorks_Companies_ResponsibleId",
                table: "ProjectWorks");

            migrationBuilder.AlterColumn<int>(
                name: "ResponsibleId",
                table: "ProjectWorks",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectWorks_Companies_ResponsibleId",
                table: "ProjectWorks",
                column: "ResponsibleId",
                principalTable: "Companies",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProjectWorks_Companies_ResponsibleId",
                table: "ProjectWorks");

            migrationBuilder.AlterColumn<int>(
                name: "ResponsibleId",
                table: "ProjectWorks",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectWorks_Companies_ResponsibleId",
                table: "ProjectWorks",
                column: "ResponsibleId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
