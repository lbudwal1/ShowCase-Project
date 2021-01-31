using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Web.Api.Infrastructure.Data.Entities;

namespace Web.Api.Infrastructure.Data.EntityFramework {
    public partial class DemoDBContext : DbContext
    {
        public DemoDBContext()
        {
        }

        public DemoDBContext(DbContextOptions<DemoDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Address> Address { get; set; }
        public virtual DbSet<AddressType> AddressType { get; set; }
        public virtual DbSet<BaseEntity> BaseEntity { get; set; }
        public virtual DbSet<BaseEntityComment> BaseEntityComment { get; set; }
        public virtual DbSet<Category> Category { get; set; }
        public virtual DbSet<City> City { get; set; }
        public virtual DbSet<Country> Country { get; set; }
        public virtual DbSet<Customer> Customer { get; set; }
        public virtual DbSet<District> District { get; set; }
        public virtual DbSet<Item> Item { get; set; }
        public virtual DbSet<Phone> Phone { get; set; }
        public virtual DbSet<PhoneType> PhoneType { get; set; }
        public virtual DbSet<StoreLocation> StoreLocation { get; set; }
        public virtual DbSet<StoreLocationCustomer> StoreLocationCustomer { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
            if (!optionsBuilder.IsConfigured) {
                //#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                IConfigurationRoot configuration = new ConfigurationBuilder()
                .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
                .AddJsonFile("appsettings.json")
                .Build();
                optionsBuilder.UseSqlServer(configuration.GetConnectionString("Default"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Address>(entity =>
            {
                entity.HasKey(e => new { e.BaseEntityId, e.AddressTypeId });

                entity.ToTable("Address", "Core");

                entity.Property(e => e.Line1).HasMaxLength(150);

                entity.Property(e => e.Line2).HasMaxLength(150);

                entity.Property(e => e.PostalArea).HasMaxLength(10);

                entity.HasOne(d => d.AddressType)
                    .WithMany(p => p.Address)
                    .HasForeignKey(d => d.AddressTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Address_AddressType");

                entity.HasOne(d => d.BaseEntity)
                    .WithMany(p => p.Address)
                    .HasForeignKey(d => d.BaseEntityId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Address_BaseEntity");

                entity.HasOne(d => d.City)
                    .WithMany(p => p.Address)
                    .HasForeignKey(d => d.CityId)
                    .HasConstraintName("FK_Address_City");

                entity.HasOne(d => d.Country)
                    .WithMany(p => p.Address)
                    .HasForeignKey(d => d.CountryId)
                    .HasConstraintName("FK_Address_Country");

                entity.HasOne(d => d.District)
                    .WithMany(p => p.Address)
                    .HasForeignKey(d => d.DistrictId)
                    .HasConstraintName("FK_Address_District");
            });

            modelBuilder.Entity<AddressType>(entity =>
            {
                entity.ToTable("AddressType", "Core");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(30);
            });

            modelBuilder.Entity<BaseEntity>(entity =>
            {
                entity.ToTable("BaseEntity", "Core");

                entity.Property(e => e.Id).ValueGeneratedOnAdd();

                entity.HasOne(d => d.IdNavigation)
                    .WithOne(p => p.BaseEntity)
                    .HasForeignKey<BaseEntity>(d => d.Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BaseEntity_Customer");
            });

            modelBuilder.Entity<BaseEntityComment>(entity =>
            {
                entity.HasKey(e => new { e.AboutId, e.Id });

                entity.ToTable("BaseEntityComment", "Core");

                entity.Property(e => e.Id).ValueGeneratedOnAdd();

                entity.Property(e => e.CommentText).IsRequired();

                entity.Property(e => e.DateAdded).HasColumnType("datetime");

                entity.HasOne(d => d.About)
                    .WithMany(p => p.BaseEntityCommentAbout)
                    .HasForeignKey(d => d.AboutId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BaseEntityComment_BaseEntity");

                entity.HasOne(d => d.PostedBy)
                    .WithMany(p => p.BaseEntityCommentPostedBy)
                    .HasForeignKey(d => d.PostedById)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BaseEntityComment_BaseEntity1");

                entity.HasOne(d => d.BaseEntityCommentNavigation)
                    .WithMany(p => p.InverseBaseEntityCommentNavigation)
                    .HasForeignKey(d => new { d.AboutId, d.ParentCommentId })
                    .HasConstraintName("FK_BaseEntityComment_BaseEntityComment");
            });

            modelBuilder.Entity<Category>(entity =>
            {
                entity.ToTable("Category", "Inventory");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(100);
            });

            modelBuilder.Entity<City>(entity =>
            {
                entity.ToTable("City", "Core");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(255);

                entity.HasOne(d => d.District)
                    .WithMany(p => p.City)
                    .HasForeignKey(d => d.DistrictId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_City_District");
            });

            modelBuilder.Entity<Country>(entity =>
            {
                entity.ToTable("Country", "Core");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(100);
            });

            modelBuilder.Entity<Customer>(entity =>
            {
                entity.ToTable("Customer", "Sales");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<District>(entity =>
            {
                entity.ToTable("District", "Core");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.HasOne(d => d.Country)
                    .WithMany(p => p.District)
                    .HasForeignKey(d => d.CountryId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_District_Country");
            });

            modelBuilder.Entity<Item>(entity =>
            {
                entity.ToTable("Item", "Inventory");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Description).IsRequired();

                entity.Property(e => e.Price).HasColumnType("money");

                entity.Property(e => e.StockNumber)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.HasOne(d => d.Category)
                    .WithMany(p => p.Item)
                    .HasForeignKey(d => d.CategoryId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Item_Category");
            });

            modelBuilder.Entity<Phone>(entity =>
            {
                entity.HasKey(e => new { e.BaseEntityId, e.PhoneTypeId });

                entity.ToTable("Phone", "Core");

                entity.Property(e => e.PhoneNumber)
                    .IsRequired()
                    .HasMaxLength(40);

                entity.HasOne(d => d.BaseEntity)
                    .WithMany(p => p.Phone)
                    .HasForeignKey(d => d.BaseEntityId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Phone_BaseEntity");

                entity.HasOne(d => d.PhoneType)
                    .WithMany(p => p.Phone)
                    .HasForeignKey(d => d.PhoneTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Phone_PhoneType");
            });

            modelBuilder.Entity<PhoneType>(entity =>
            {
                entity.ToTable("PhoneType", "Core");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(10);
            });

            modelBuilder.Entity<StoreLocation>(entity =>
            {
                entity.ToTable("StoreLocation", "Core");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Name).HasMaxLength(150);

                entity.HasOne(d => d.IdNavigation)
                    .WithOne(p => p.StoreLocation)
                    .HasForeignKey<StoreLocation>(d => d.Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_StoreLocation_BaseEntity");
            });

            modelBuilder.Entity<StoreLocationCustomer>(entity =>
            {
                entity.HasKey(e => new { e.StoreLocationId, e.CustomerId });

                entity.ToTable("StoreLocationCustomer", "Sales");

                entity.HasOne(d => d.Customer)
                    .WithMany(p => p.StoreLocationCustomer)
                    .HasForeignKey(d => d.CustomerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_StoreLocationCustomer_Customer");

                entity.HasOne(d => d.StoreLocation)
                    .WithMany(p => p.StoreLocationCustomer)
                    .HasForeignKey(d => d.StoreLocationId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_StoreLocationCustomer_StoreLocation");
            });
        }
    }
}
