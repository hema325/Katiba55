using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Katiba55.API.Migrations
{
    /// <inheritdoc />
    public partial class ProjectIdToBOQ : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "WorkId",
                table: "BOQs",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AddColumn<int>(
                name: "ProjectId",
                table: "BOQs",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_BOQs_ProjectId",
                table: "BOQs",
                column: "ProjectId");

            migrationBuilder.AddForeignKey(
                name: "FK_BOQs_Projects_ProjectId",
                table: "BOQs",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BOQs_Projects_ProjectId",
                table: "BOQs");

            migrationBuilder.DropIndex(
                name: "IX_BOQs_ProjectId",
                table: "BOQs");

            migrationBuilder.DropColumn(
                name: "ProjectId",
                table: "BOQs");

            migrationBuilder.AlterColumn<int>(
                name: "WorkId",
                table: "BOQs",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);
        }
    }
}
