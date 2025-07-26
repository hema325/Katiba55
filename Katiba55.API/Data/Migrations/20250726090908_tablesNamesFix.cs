using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Katiba55.API.Migrations
{
    /// <inheritdoc />
    public partial class tablesNamesFix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Advance_Contract_ContractId",
                table: "Advance");

            migrationBuilder.DropForeignKey(
                name: "FK_Contract_BOQ_BOQId",
                table: "Contract");

            migrationBuilder.DropForeignKey(
                name: "FK_Invoice_Contract_ContractId",
                table: "Invoice");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Invoice",
                table: "Invoice");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Contract",
                table: "Contract");

            migrationBuilder.DropPrimaryKey(
                name: "PK_BOQ",
                table: "BOQ");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Advance",
                table: "Advance");

            migrationBuilder.RenameTable(
                name: "Invoice",
                newName: "Invoices");

            migrationBuilder.RenameTable(
                name: "Contract",
                newName: "Contracts");

            migrationBuilder.RenameTable(
                name: "BOQ",
                newName: "BOQs");

            migrationBuilder.RenameTable(
                name: "Advance",
                newName: "Advances");

            migrationBuilder.RenameIndex(
                name: "IX_Invoice_ContractId",
                table: "Invoices",
                newName: "IX_Invoices_ContractId");

            migrationBuilder.RenameIndex(
                name: "IX_Contract_BOQId",
                table: "Contracts",
                newName: "IX_Contracts_BOQId");

            migrationBuilder.RenameIndex(
                name: "IX_Advance_ContractId",
                table: "Advances",
                newName: "IX_Advances_ContractId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Invoices",
                table: "Invoices",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Contracts",
                table: "Contracts",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_BOQs",
                table: "BOQs",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Advances",
                table: "Advances",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Advances_Contracts_ContractId",
                table: "Advances",
                column: "ContractId",
                principalTable: "Contracts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Contracts_BOQs_BOQId",
                table: "Contracts",
                column: "BOQId",
                principalTable: "BOQs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Invoices_Contracts_ContractId",
                table: "Invoices",
                column: "ContractId",
                principalTable: "Contracts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Advances_Contracts_ContractId",
                table: "Advances");

            migrationBuilder.DropForeignKey(
                name: "FK_Contracts_BOQs_BOQId",
                table: "Contracts");

            migrationBuilder.DropForeignKey(
                name: "FK_Invoices_Contracts_ContractId",
                table: "Invoices");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Invoices",
                table: "Invoices");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Contracts",
                table: "Contracts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_BOQs",
                table: "BOQs");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Advances",
                table: "Advances");

            migrationBuilder.RenameTable(
                name: "Invoices",
                newName: "Invoice");

            migrationBuilder.RenameTable(
                name: "Contracts",
                newName: "Contract");

            migrationBuilder.RenameTable(
                name: "BOQs",
                newName: "BOQ");

            migrationBuilder.RenameTable(
                name: "Advances",
                newName: "Advance");

            migrationBuilder.RenameIndex(
                name: "IX_Invoices_ContractId",
                table: "Invoice",
                newName: "IX_Invoice_ContractId");

            migrationBuilder.RenameIndex(
                name: "IX_Contracts_BOQId",
                table: "Contract",
                newName: "IX_Contract_BOQId");

            migrationBuilder.RenameIndex(
                name: "IX_Advances_ContractId",
                table: "Advance",
                newName: "IX_Advance_ContractId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Invoice",
                table: "Invoice",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Contract",
                table: "Contract",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_BOQ",
                table: "BOQ",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Advance",
                table: "Advance",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Advance_Contract_ContractId",
                table: "Advance",
                column: "ContractId",
                principalTable: "Contract",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Contract_BOQ_BOQId",
                table: "Contract",
                column: "BOQId",
                principalTable: "BOQ",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Invoice_Contract_ContractId",
                table: "Invoice",
                column: "ContractId",
                principalTable: "Contract",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
