using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Katiba55.API.Migrations
{
    /// <inheritdoc />
    public partial class workextras : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TotalContractValue",
                table: "Works");

            migrationBuilder.AddColumn<decimal>(
                name: "ExecutedValue",
                table: "Works",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "RelativeExecutionPercent",
                table: "Works",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "RelativeWeightPercent",
                table: "Works",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "TotalValue",
                table: "Works",
                type: "decimal(18,2)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ExecutedValue",
                table: "Works");

            migrationBuilder.DropColumn(
                name: "RelativeExecutionPercent",
                table: "Works");

            migrationBuilder.DropColumn(
                name: "RelativeWeightPercent",
                table: "Works");

            migrationBuilder.DropColumn(
                name: "TotalValue",
                table: "Works");

            migrationBuilder.AddColumn<decimal>(
                name: "TotalContractValue",
                table: "Works",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);
        }
    }
}
