using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.Extensions.Configuration;

#nullable disable

namespace LaunchCodeApi.Model
{
    public partial class LaunchCodeContext : DbContext
    {
        public LaunchCodeContext()
        {
        }

        public LaunchCodeContext(DbContextOptions<LaunchCodeContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Airport> Airports { get; set; }
        public virtual DbSet<Customer> Customers { get; set; }
        public virtual DbSet<Quote> Quotes { get; set; }
        public virtual DbSet<Transportation> Transportations { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
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
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<Airport>(entity =>
            {
                entity.ToTable("Airport");

                entity.Property(e => e.Code)
                    .HasMaxLength(3)
                    .IsUnicode(false);

                entity.Property(e => e.CountryCode)
                    .HasMaxLength(2)
                    .IsUnicode(false);

                entity.Property(e => e.CountryName)
                    .HasMaxLength(32)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .HasMaxLength(56)
                    .IsUnicode(false);

                entity.Property(e => e.StateCode)
                    .HasMaxLength(2)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Customer>(entity =>
            {
                entity.ToTable("Customer");

                entity.Property(e => e.Address)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Email).HasMaxLength(50);

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.PhoneNumber).HasMaxLength(50);
            });

            modelBuilder.Entity<Quote>(entity =>
            {
                entity.ToTable("Quote");

                entity.HasOne(d => d.Customer)
                    .WithMany(p => p.Quotes)
                    .HasForeignKey(d => d.CustomerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Quote_Customer");

                entity.HasOne(d => d.Departure)
                    .WithMany(p => p.QuoteDepartures)
                    .HasForeignKey(d => d.DepartureId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Quote_Airport");

                entity.HasOne(d => d.Destination)
                    .WithMany(p => p.QuoteDestinations)
                    .HasForeignKey(d => d.DestinationId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Quote_Airport1");

                entity.HasOne(d => d.Transportation)
                    .WithMany(p => p.Quotes)
                    .HasForeignKey(d => d.TransportationId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Quote_Transportation");
            });

            modelBuilder.Entity<Transportation>(entity =>
            {
                entity.ToTable("Transportation");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(20);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
