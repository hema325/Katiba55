using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Katiba55.API.Migrations
{
    /// <inheritdoc />
    public partial class WorkCompanies : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Works_Companies_ResponsibleId",
                table: "Works");

            migrationBuilder.DropIndex(
                name: "IX_Works_ResponsibleId",
                table: "Works");

            migrationBuilder.DropColumn(
                name: "ResponsibleId",
                table: "Works");

            migrationBuilder.CreateTable(
                name: "WorkCompany",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Role = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    WorkId = table.Column<int>(type: "int", nullable: false),
                    CompanyId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkCompany", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WorkCompany_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_WorkCompany_Works_WorkId",
                        column: x => x.WorkId,
                        principalTable: "Works",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_WorkCompany_CompanyId",
                table: "WorkCompany",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkCompany_WorkId",
                table: "WorkCompany",
                column: "WorkId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "WorkCompany");

            migrationBuilder.AddColumn<int>(
                name: "ResponsibleId",
                table: "Works",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Works_ResponsibleId",
                table: "Works",
                column: "ResponsibleId");

            migrationBuilder.AddForeignKey(
                name: "FK_Works_Companies_ResponsibleId",
                table: "Works",
                column: "ResponsibleId",
                principalTable: "Companies",
                principalColumn: "Id");
        }
    }
}
