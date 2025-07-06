using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Katiba55.API.Migrations
{
    /// <inheritdoc />
    public partial class Init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Companies",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    RepresentativeName = table.Column<string>(type: "TEXT", nullable: false),
                    Email = table.Column<string>(type: "TEXT", nullable: false),
                    Phone = table.Column<string>(type: "TEXT", nullable: false),
                    Address = table.Column<string>(type: "TEXT", nullable: false),
                    Latitude = table.Column<string>(type: "TEXT", nullable: false),
                    Longitude = table.Column<string>(type: "TEXT", nullable: false),
                    SecurityApprovalPath = table.Column<string>(type: "TEXT", unicode: false, nullable: false),
                    Notes = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Companies", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Officer",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Email = table.Column<string>(type: "TEXT", nullable: false),
                    Phone = table.Column<string>(type: "TEXT", nullable: false),
                    Rank = table.Column<int>(type: "INTEGER", nullable: false),
                    Status = table.Column<int>(type: "INTEGER", nullable: false),
                    JoinDate = table.Column<DateTimeOffset>(type: "TEXT", nullable: false),
                    LeaveDate = table.Column<DateTimeOffset>(type: "TEXT", nullable: true),
                    Notes = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Officer", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Projects",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    PosterPath = table.Column<string>(type: "TEXT", unicode: false, nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    ExecutingSide = table.Column<string>(type: "TEXT", nullable: false),
                    BenefitingSide = table.Column<string>(type: "TEXT", nullable: false),
                    EstimatedCost = table.Column<decimal>(type: "TEXT", nullable: false),
                    FinancialAllocation = table.Column<decimal>(type: "TEXT", nullable: false),
                    StartDate = table.Column<DateTimeOffset>(type: "TEXT", nullable: false),
                    EndDate = table.Column<DateTimeOffset>(type: "TEXT", nullable: true),
                    Address = table.Column<string>(type: "TEXT", nullable: false),
                    Latitude = table.Column<string>(type: "TEXT", nullable: false),
                    Longitude = table.Column<string>(type: "TEXT", nullable: false),
                    Status = table.Column<int>(type: "INTEGER", nullable: false),
                    Details = table.Column<string>(type: "TEXT", nullable: true),
                    Notes = table.Column<string>(type: "TEXT", nullable: true),
                    SupervisorId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Projects", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Projects_Officer_SupervisorId",
                        column: x => x.SupervisorId,
                        principalTable: "Officer",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProjectCompanies",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Role = table.Column<string>(type: "TEXT", nullable: false),
                    StartDate = table.Column<DateTimeOffset>(type: "TEXT", nullable: false),
                    EndDate = table.Column<DateTimeOffset>(type: "TEXT", nullable: true),
                    Notes = table.Column<string>(type: "TEXT", nullable: true),
                    CompanyId = table.Column<int>(type: "INTEGER", nullable: false),
                    ProjectId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectCompanies", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProjectCompanies_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProjectCompanies_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProjectExecutionHistory",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Percentage = table.Column<double>(type: "REAL", nullable: false),
                    Date = table.Column<DateTimeOffset>(type: "TEXT", nullable: false),
                    Details = table.Column<string>(type: "TEXT", nullable: true),
                    Notes = table.Column<string>(type: "TEXT", nullable: true),
                    ProjectId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectExecutionHistory", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProjectExecutionHistory_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProjectMedias",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Path = table.Column<string>(type: "TEXT", unicode: false, nullable: false),
                    Type = table.Column<int>(type: "INTEGER", nullable: false),
                    UploadedDate = table.Column<DateTimeOffset>(type: "TEXT", nullable: false),
                    Size = table.Column<double>(type: "REAL", nullable: false),
                    Category = table.Column<string>(type: "TEXT", nullable: false),
                    ProjectId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectMedias", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProjectMedias_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Companies_Email",
                table: "Companies",
                column: "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Companies_Name",
                table: "Companies",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Companies_Phone",
                table: "Companies",
                column: "Phone",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Officer_Email",
                table: "Officer",
                column: "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Officer_Name",
                table: "Officer",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Officer_Phone",
                table: "Officer",
                column: "Phone",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ProjectCompanies_CompanyId",
                table: "ProjectCompanies",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectCompanies_ProjectId",
                table: "ProjectCompanies",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectExecutionHistory_ProjectId",
                table: "ProjectExecutionHistory",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectMedias_ProjectId",
                table: "ProjectMedias",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_Projects_Name",
                table: "Projects",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Projects_SupervisorId",
                table: "Projects",
                column: "SupervisorId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProjectCompanies");

            migrationBuilder.DropTable(
                name: "ProjectExecutionHistory");

            migrationBuilder.DropTable(
                name: "ProjectMedias");

            migrationBuilder.DropTable(
                name: "Companies");

            migrationBuilder.DropTable(
                name: "Projects");

            migrationBuilder.DropTable(
                name: "Officer");
        }
    }
}
