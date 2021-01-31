using System;

namespace LaunchCodeApi.Model.DTO
{
    public class QuoteDTO
    {
        public int? Id { get; set; }
        public CustomerDTO Customer { get; set; }
        public int DepatureId { get; set; }
        public int DestinationId { get; set; }
        public int NumberOfTravellers { get; set; }
        public int TransportationId { get; set; }
        public DateTime DepatureDate { get; set; }
        public DateTime? ReturnDate { get; set; }
        public AirportDTO Depature { get; set; }
        public AirportDTO Destination { get; set; }
        public DateTime DateAdded { get; set; }
        public DateTime? DateModified { get; set; }
    }

    public class CustomerDTO
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
    }

    public class AirportDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public string StateCode { get; set; }
        public string CountryCode { get; set; }
        public string CountryName { get; set; }
    }
}
