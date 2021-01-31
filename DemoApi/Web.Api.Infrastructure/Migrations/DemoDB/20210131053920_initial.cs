using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Web.Api.Infrastructure.Migrations.DemoDB
{
    public partial class initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "Core");

            migrationBuilder.EnsureSchema(
                name: "Inventory");

            migrationBuilder.EnsureSchema(
                name: "Sales");

            migrationBuilder.CreateTable(
                name: "AddressType",
                schema: "Core",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false),
                    Name = table.Column<string>(maxLength: 30, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AddressType", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Country",
                schema: "Core",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Country", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PhoneType",
                schema: "Core",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false),
                    Name = table.Column<string>(maxLength: 10, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PhoneType", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Category",
                schema: "Inventory",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false),
                    Name = table.Column<string>(maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Category", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Customer",
                schema: "Sales",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false),
                    FirstName = table.Column<string>(maxLength: 50, nullable: false),
                    LastName = table.Column<string>(maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Customer", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "District",
                schema: "Core",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(maxLength: 100, nullable: false),
                    CountryId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_District", x => x.Id);
                    table.ForeignKey(
                        name: "FK_District_Country",
                        column: x => x.CountryId,
                        principalSchema: "Core",
                        principalTable: "Country",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Item",
                schema: "Inventory",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false),
                    CategoryId = table.Column<int>(nullable: false),
                    StockNumber = table.Column<string>(maxLength: 50, nullable: false),
                    Description = table.Column<string>(nullable: false),
                    Price = table.Column<decimal>(type: "money", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Item", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Item_Category",
                        column: x => x.CategoryId,
                        principalSchema: "Inventory",
                        principalTable: "Category",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "BaseEntity",
                schema: "Core",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    PreferredPhoneTypeId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BaseEntity", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BaseEntity_Customer",
                        column: x => x.Id,
                        principalSchema: "Sales",
                        principalTable: "Customer",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "City",
                schema: "Core",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(maxLength: 255, nullable: false),
                    DistrictId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_City", x => x.Id);
                    table.ForeignKey(
                        name: "FK_City_District",
                        column: x => x.DistrictId,
                        principalSchema: "Core",
                        principalTable: "District",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "BaseEntityComment",
                schema: "Core",
                columns: table => new
                {
                    AboutId = table.Column<int>(nullable: false),
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    PostedById = table.Column<int>(nullable: false),
                    ParentCommentId = table.Column<int>(nullable: true),
                    CommentText = table.Column<string>(nullable: false),
                    DateAdded = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BaseEntityComment", x => new { x.AboutId, x.Id });
                    table.ForeignKey(
                        name: "FK_BaseEntityComment_BaseEntity",
                        column: x => x.AboutId,
                        principalSchema: "Core",
                        principalTable: "BaseEntity",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_BaseEntityComment_BaseEntity1",
                        column: x => x.PostedById,
                        principalSchema: "Core",
                        principalTable: "BaseEntity",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_BaseEntityComment_BaseEntityComment",
                        columns: x => new { x.AboutId, x.ParentCommentId },
                        principalSchema: "Core",
                        principalTable: "BaseEntityComment",
                        principalColumns: new[] { "AboutId", "Id" },
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Phone",
                schema: "Core",
                columns: table => new
                {
                    BaseEntityId = table.Column<int>(nullable: false),
                    PhoneTypeId = table.Column<int>(nullable: false),
                    PhoneNumber = table.Column<string>(maxLength: 40, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Phone", x => new { x.BaseEntityId, x.PhoneTypeId });
                    table.ForeignKey(
                        name: "FK_Phone_BaseEntity",
                        column: x => x.BaseEntityId,
                        principalSchema: "Core",
                        principalTable: "BaseEntity",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Phone_PhoneType",
                        column: x => x.PhoneTypeId,
                        principalSchema: "Core",
                        principalTable: "PhoneType",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "StoreLocation",
                schema: "Core",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false),
                    Name = table.Column<string>(maxLength: 150, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StoreLocation", x => x.Id);
                    table.ForeignKey(
                        name: "FK_StoreLocation_BaseEntity",
                        column: x => x.Id,
                        principalSchema: "Core",
                        principalTable: "BaseEntity",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Address",
                schema: "Core",
                columns: table => new
                {
                    BaseEntityId = table.Column<int>(nullable: false),
                    AddressTypeId = table.Column<int>(nullable: false),
                    Line1 = table.Column<string>(maxLength: 150, nullable: true),
                    Line2 = table.Column<string>(maxLength: 150, nullable: true),
                    PostalArea = table.Column<string>(maxLength: 10, nullable: true),
                    CityId = table.Column<int>(nullable: true),
                    DistrictId = table.Column<int>(nullable: true),
                    CountryId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Address", x => new { x.BaseEntityId, x.AddressTypeId });
                    table.ForeignKey(
                        name: "FK_Address_AddressType",
                        column: x => x.AddressTypeId,
                        principalSchema: "Core",
                        principalTable: "AddressType",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Address_BaseEntity",
                        column: x => x.BaseEntityId,
                        principalSchema: "Core",
                        principalTable: "BaseEntity",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Address_City",
                        column: x => x.CityId,
                        principalSchema: "Core",
                        principalTable: "City",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Address_Country",
                        column: x => x.CountryId,
                        principalSchema: "Core",
                        principalTable: "Country",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Address_District",
                        column: x => x.DistrictId,
                        principalSchema: "Core",
                        principalTable: "District",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "StoreLocationCustomer",
                schema: "Sales",
                columns: table => new
                {
                    StoreLocationId = table.Column<int>(nullable: false),
                    CustomerId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StoreLocationCustomer", x => new { x.StoreLocationId, x.CustomerId });
                    table.ForeignKey(
                        name: "FK_StoreLocationCustomer_Customer",
                        column: x => x.CustomerId,
                        principalSchema: "Sales",
                        principalTable: "Customer",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_StoreLocationCustomer_StoreLocation",
                        column: x => x.StoreLocationId,
                        principalSchema: "Core",
                        principalTable: "StoreLocation",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Address_AddressTypeId",
                schema: "Core",
                table: "Address",
                column: "AddressTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Address_CityId",
                schema: "Core",
                table: "Address",
                column: "CityId");

            migrationBuilder.CreateIndex(
                name: "IX_Address_CountryId",
                schema: "Core",
                table: "Address",
                column: "CountryId");

            migrationBuilder.CreateIndex(
                name: "IX_Address_DistrictId",
                schema: "Core",
                table: "Address",
                column: "DistrictId");

            migrationBuilder.CreateIndex(
                name: "IX_BaseEntityComment_PostedById",
                schema: "Core",
                table: "BaseEntityComment",
                column: "PostedById");

            migrationBuilder.CreateIndex(
                name: "IX_BaseEntityComment_AboutId_ParentCommentId",
                schema: "Core",
                table: "BaseEntityComment",
                columns: new[] { "AboutId", "ParentCommentId" });

            migrationBuilder.CreateIndex(
                name: "IX_City_DistrictId",
                schema: "Core",
                table: "City",
                column: "DistrictId");

            migrationBuilder.CreateIndex(
                name: "IX_District_CountryId",
                schema: "Core",
                table: "District",
                column: "CountryId");

            migrationBuilder.CreateIndex(
                name: "IX_Phone_PhoneTypeId",
                schema: "Core",
                table: "Phone",
                column: "PhoneTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Item_CategoryId",
                schema: "Inventory",
                table: "Item",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_StoreLocationCustomer_CustomerId",
                schema: "Sales",
                table: "StoreLocationCustomer",
                column: "CustomerId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Address",
                schema: "Core");

            migrationBuilder.DropTable(
                name: "BaseEntityComment",
                schema: "Core");

            migrationBuilder.DropTable(
                name: "Phone",
                schema: "Core");

            migrationBuilder.DropTable(
                name: "Item",
                schema: "Inventory");

            migrationBuilder.DropTable(
                name: "StoreLocationCustomer",
                schema: "Sales");

            migrationBuilder.DropTable(
                name: "AddressType",
                schema: "Core");

            migrationBuilder.DropTable(
                name: "City",
                schema: "Core");

            migrationBuilder.DropTable(
                name: "PhoneType",
                schema: "Core");

            migrationBuilder.DropTable(
                name: "Category",
                schema: "Inventory");

            migrationBuilder.DropTable(
                name: "StoreLocation",
                schema: "Core");

            migrationBuilder.DropTable(
                name: "District",
                schema: "Core");

            migrationBuilder.DropTable(
                name: "BaseEntity",
                schema: "Core");

            migrationBuilder.DropTable(
                name: "Country",
                schema: "Core");

            migrationBuilder.DropTable(
                name: "Customer",
                schema: "Sales");
        }
    }
}
