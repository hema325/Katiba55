using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Katiba55.API.Migrations
{
    /// <inheritdoc />
    public partial class ContractsNullableFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Contracts_Number",
                table: "Contracts");

            migrationBuilder.AlterColumn<double>(
                name: "Value",
                table: "Contracts",
                type: "REAL",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "TEXT");

            migrationBuilder.AlterColumn<string>(
                name: "Number",
                table: "Contracts",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.CreateIndex(
                name: "IX_Contracts_Number",
                table: "Contracts",
                column: "Number");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Contracts_Number",
                table: "Contracts");

            migrationBuilder.AlterColumn<decimal>(
                name: "Value",
                table: "Contracts",
                type: "TEXT",
                nullable: false,
                defaultValue: 0m,
                oldClrType: typeof(double),
                oldType: "REAL",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Number",
                table: "Contracts",
                type: "TEXT",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Contracts_Number",
                table: "Contracts",
                column: "Number",
                unique: true);
        }
    }
}
