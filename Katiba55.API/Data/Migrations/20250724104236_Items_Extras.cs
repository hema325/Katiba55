using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Katiba55.API.Migrations
{
    /// <inheritdoc />
    public partial class Items_Extras : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Items_Projects_ProjectId",
                table: "Items");

            migrationBuilder.DropTable(
                name: "WorkItems");

            migrationBuilder.AlterColumn<int>(
                name: "ProjectId",
                table: "Items",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<DateTime>(
                name: "ActualEndDate",
                table: "Items",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ActualStartDate",
                table: "Items",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "EstimatedEndDate",
                table: "Items",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "EstimatedStartDate",
                table: "Items",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "ExecutedValue",
                table: "Items",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ExecutionDate",
                table: "Items",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "ExecutionPercent",
                table: "Items",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ExecutionStatus",
                table: "Items",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Notes",
                table: "Items",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "RelativeExecutionPercent",
                table: "Items",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "RelativeWeightPercent",
                table: "Items",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "TotalValue",
                table: "Items",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "WorkId",
                table: "Items",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Items_WorkId",
                table: "Items",
                column: "WorkId");

            migrationBuilder.AddForeignKey(
                name: "FK_Items_Projects_ProjectId",
                table: "Items",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Items_Works_WorkId",
                table: "Items",
                column: "WorkId",
                principalTable: "Works",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Items_Projects_ProjectId",
                table: "Items");

            migrationBuilder.DropForeignKey(
                name: "FK_Items_Works_WorkId",
                table: "Items");

            migrationBuilder.DropIndex(
                name: "IX_Items_WorkId",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "ActualEndDate",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "ActualStartDate",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "EstimatedEndDate",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "EstimatedStartDate",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "ExecutedValue",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "ExecutionDate",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "ExecutionPercent",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "ExecutionStatus",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "Notes",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "RelativeExecutionPercent",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "RelativeWeightPercent",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "TotalValue",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "WorkId",
                table: "Items");

            migrationBuilder.AlterColumn<int>(
                name: "ProjectId",
                table: "Items",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "WorkItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ItemId = table.Column<int>(type: "int", nullable: false),
                    WorkId = table.Column<int>(type: "int", nullable: false),
                    ExecutedValue = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    ExecutionDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ExecutionPercent = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    ExecutionStatus = table.Column<int>(type: "int", nullable: false),
                    RelativeExecutionPercent = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    RelativeWeight = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TotalValue = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WorkItems_Items_ItemId",
                        column: x => x.ItemId,
                        principalTable: "Items",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_WorkItems_Works_WorkId",
                        column: x => x.WorkId,
                        principalTable: "Works",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_WorkItems_ItemId",
                table: "WorkItems",
                column: "ItemId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkItems_WorkId",
                table: "WorkItems",
                column: "WorkId");

            migrationBuilder.AddForeignKey(
                name: "FK_Items_Projects_ProjectId",
                table: "Items",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
