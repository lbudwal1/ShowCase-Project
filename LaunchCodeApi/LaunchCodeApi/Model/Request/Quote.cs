
using System;

namespace LaunchCodeApi.Model.Request
{
    public class DeleteQuote
    {
        public int Id { get; set; }
    }

    public class AddEditQuote
    {
        public int? Id { get; set; }
        public AddEditCustomer Customer { get; set; }
        public int DepatureId { get; set; }
        public int DestinationId { get; set; }
        public int NumberOfTravellers { get; set; }
        public int TransportationId { get; set; }
        public string DepatureDate { get; set; }
        public string ReturnDate { get; set; }
    }

    public class AddEditCustomer
    {
        public int? Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
    }
}
