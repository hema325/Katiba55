using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Katiba55.API.Migrations
{
    /// <inheritdoc />
    public partial class WorkCompanies2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WorkCompany_Companies_CompanyId",
                table: "WorkCompany");

            migrationBuilder.DropForeignKey(
                name: "FK_WorkCompany_Works_WorkId",
                table: "WorkCompany");

            migrationBuilder.DropPrimaryKey(
                name: "PK_WorkCompany",
                table: "WorkCompany");

            migrationBuilder.RenameTable(
                name: "WorkCompany",
                newName: "WorkCompanies");

            migrationBuilder.RenameIndex(
                name: "IX_WorkCompany_WorkId",
                table: "WorkCompanies",
                newName: "IX_WorkCompanies_WorkId");

            migrationBuilder.RenameIndex(
                name: "IX_WorkCompany_CompanyId",
                table: "WorkCompanies",
                newName: "IX_WorkCompanies_CompanyId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_WorkCompanies",
                table: "WorkCompanies",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_WorkCompanies_Companies_CompanyId",
                table: "WorkCompanies",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_WorkCompanies_Works_WorkId",
                table: "WorkCompanies",
                column: "WorkId",
                principalTable: "Works",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WorkCompanies_Companies_CompanyId",
                table: "WorkCompanies");

            migrationBuilder.DropForeignKey(
                name: "FK_WorkCompanies_Works_WorkId",
                table: "WorkCompanies");

            migrationBuilder.DropPrimaryKey(
                name: "PK_WorkCompanies",
                table: "WorkCompanies");

            migrationBuilder.RenameTable(
                name: "WorkCompanies",
                newName: "WorkCompany");

            migrationBuilder.RenameIndex(
                name: "IX_WorkCompanies_WorkId",
                table: "WorkCompany",
                newName: "IX_WorkCompany_WorkId");

            migrationBuilder.RenameIndex(
                name: "IX_WorkCompanies_CompanyId",
                table: "WorkCompany",
                newName: "IX_WorkCompany_CompanyId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_WorkCompany",
                table: "WorkCompany",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_WorkCompany_Companies_CompanyId",
                table: "WorkCompany",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_WorkCompany_Works_WorkId",
                table: "WorkCompany",
                column: "WorkId",
                principalTable: "Works",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
