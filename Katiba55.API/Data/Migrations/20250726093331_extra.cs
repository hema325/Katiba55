using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Katiba55.API.Migrations
{
    /// <inheritdoc />
    public partial class extra : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Number",
                table: "Invoices");

            migrationBuilder.AlterColumn<string>(
                name: "Number",
                table: "Contracts",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Number",
                table: "BOQs",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<int>(
                name: "WorkId",
                table: "BOQs",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Contracts_Number",
                table: "Contracts",
                column: "Number",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_BOQs_Number",
                table: "BOQs",
                column: "Number",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_BOQs_WorkId",
                table: "BOQs",
                column: "WorkId");

            migrationBuilder.AddForeignKey(
                name: "FK_BOQs_Works_WorkId",
                table: "BOQs",
                column: "WorkId",
                principalTable: "Works",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BOQs_Works_WorkId",
                table: "BOQs");

            migrationBuilder.DropIndex(
                name: "IX_Contracts_Number",
                table: "Contracts");

            migrationBuilder.DropIndex(
                name: "IX_BOQs_Number",
                table: "BOQs");

            migrationBuilder.DropIndex(
                name: "IX_BOQs_WorkId",
                table: "BOQs");

            migrationBuilder.DropColumn(
                name: "WorkId",
                table: "BOQs");

            migrationBuilder.AddColumn<string>(
                name: "Number",
                table: "Invoices",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<string>(
                name: "Number",
                table: "Contracts",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AlterColumn<string>(
                name: "Number",
                table: "BOQs",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");
        }
    }
}
