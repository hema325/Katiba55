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
                    RepresentativeName = table.Column<string>(type: "TEXT", nullable: true),
                    Email = table.Column<string>(type: "TEXT", nullable: true),
                    Phone = table.Column<string>(type: "TEXT", nullable: true),
                    Status = table.Column<int>(type: "INTEGER", nullable: false),
                    Address = table.Column<string>(type: "TEXT", nullable: true),
                    Latitude = table.Column<double>(type: "REAL", nullable: true),
                    Longitude = table.Column<double>(type: "REAL", nullable: true),
                    ApprovalImagPath = table.Column<string>(type: "TEXT", unicode: false, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Companies", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Officers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Email = table.Column<string>(type: "TEXT", nullable: true),
                    Phone = table.Column<string>(type: "TEXT", nullable: true),
                    Rank = table.Column<int>(type: "INTEGER", nullable: false),
                    Status = table.Column<int>(type: "INTEGER", nullable: false),
                    JoinDate = table.Column<DateTime>(type: "TEXT", nullable: true),
                    LeaveDate = table.Column<DateTime>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Officers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Email = table.Column<string>(type: "TEXT", nullable: false),
                    HashedPassword = table.Column<string>(type: "TEXT", nullable: false),
                    LastLoginDate = table.Column<DateTimeOffset>(type: "TEXT", nullable: true),
                    CreationDate = table.Column<DateTimeOffset>(type: "TEXT", nullable: false),
                    IsBlocked = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Projects",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    ExecutingSide = table.Column<string>(type: "TEXT", nullable: true),
                    BenefitingSide = table.Column<string>(type: "TEXT", nullable: true),
                    EstimatedCost = table.Column<decimal>(type: "TEXT", nullable: true),
                    FinancialAllocation = table.Column<decimal>(type: "TEXT", nullable: true),
                    EstimatedStartDate = table.Column<DateTime>(type: "TEXT", nullable: true),
                    EstimatedEndDate = table.Column<DateTime>(type: "TEXT", nullable: true),
                    ActualStartDate = table.Column<DateTime>(type: "TEXT", nullable: true),
                    ActualEndDate = table.Column<DateTime>(type: "TEXT", nullable: true),
                    Address = table.Column<string>(type: "TEXT", nullable: true),
                    Latitude = table.Column<double>(type: "REAL", nullable: true),
                    Longitude = table.Column<double>(type: "REAL", nullable: true),
                    Status = table.Column<int>(type: "INTEGER", nullable: false),
                    LastExecutionPercent = table.Column<double>(type: "REAL", nullable: false),
                    LastExecutionDate = table.Column<DateTime>(type: "TEXT", nullable: true),
                    SupervisorId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Projects", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Projects_Officers_SupervisorId",
                        column: x => x.SupervisorId,
                        principalTable: "Officers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Items",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    ProjectId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Items", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Items_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Medias",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Path = table.Column<string>(type: "TEXT", unicode: false, nullable: false),
                    Type = table.Column<int>(type: "INTEGER", nullable: false),
                    Date = table.Column<DateTime>(type: "TEXT", nullable: true),
                    ProjectId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Medias", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Medias_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProjectExecutionHistories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Percentage = table.Column<double>(type: "REAL", nullable: false),
                    Date = table.Column<DateTime>(type: "TEXT", nullable: false),
                    ProjectId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectExecutionHistories", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProjectExecutionHistories_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Works",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    StartDate = table.Column<DateTime>(type: "TEXT", nullable: true),
                    EndDate = table.Column<DateTime>(type: "TEXT", nullable: true),
                    LastExecutionPercent = table.Column<double>(type: "REAL", nullable: false),
                    LastExecutionDate = table.Column<DateTime>(type: "TEXT", nullable: true),
                    ResponsibleId = table.Column<int>(type: "INTEGER", nullable: true),
                    ProjectId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Works", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Works_Companies_ResponsibleId",
                        column: x => x.ResponsibleId,
                        principalTable: "Companies",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Works_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "WorkExecutionHistories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Percentage = table.Column<double>(type: "REAL", nullable: false),
                    Date = table.Column<DateTime>(type: "TEXT", nullable: false),
                    WorkId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkExecutionHistories", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WorkExecutionHistories_Works_WorkId",
                        column: x => x.WorkId,
                        principalTable: "Works",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "WorkItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    TotalCount = table.Column<int>(type: "INTEGER", nullable: false),
                    ExecutedCount = table.Column<int>(type: "INTEGER", nullable: false),
                    UnexecutedCount = table.Column<int>(type: "INTEGER", nullable: false),
                    ExecutionPercent = table.Column<double>(type: "REAL", nullable: false),
                    UpdateDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    WorkId = table.Column<int>(type: "INTEGER", nullable: false),
                    ItemId = table.Column<int>(type: "INTEGER", nullable: false)
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
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "WorkItemExecutionHistories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Percentage = table.Column<double>(type: "REAL", nullable: false),
                    Date = table.Column<DateTime>(type: "TEXT", nullable: false),
                    WorkItemId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkItemExecutionHistories", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WorkItemExecutionHistories_WorkItems_WorkItemId",
                        column: x => x.WorkItemId,
                        principalTable: "WorkItems",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Companies_Name",
                table: "Companies",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Items_ProjectId",
                table: "Items",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_Medias_ProjectId",
                table: "Medias",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_Officers_Name",
                table: "Officers",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ProjectExecutionHistories_ProjectId",
                table: "ProjectExecutionHistories",
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

            migrationBuilder.CreateIndex(
                name: "IX_WorkExecutionHistories_WorkId",
                table: "WorkExecutionHistories",
                column: "WorkId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkItemExecutionHistories_WorkItemId",
                table: "WorkItemExecutionHistories",
                column: "WorkItemId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkItems_ItemId",
                table: "WorkItems",
                column: "ItemId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkItems_WorkId",
                table: "WorkItems",
                column: "WorkId");

            migrationBuilder.CreateIndex(
                name: "IX_Works_ProjectId",
                table: "Works",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_Works_ResponsibleId",
                table: "Works",
                column: "ResponsibleId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Medias");

            migrationBuilder.DropTable(
                name: "ProjectExecutionHistories");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "WorkExecutionHistories");

            migrationBuilder.DropTable(
                name: "WorkItemExecutionHistories");

            migrationBuilder.DropTable(
                name: "WorkItems");

            migrationBuilder.DropTable(
                name: "Items");

            migrationBuilder.DropTable(
                name: "Works");

            migrationBuilder.DropTable(
                name: "Companies");

            migrationBuilder.DropTable(
                name: "Projects");

            migrationBuilder.DropTable(
                name: "Officers");
        }
    }
}
