using System;
using System.Collections.Generic;

#nullable disable

namespace LaunchCodeApi.Model
{
    public partial class Customer
    {
        public Customer()
        {
            Quotes = new HashSet<Quote>();
        }

        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public DateTime DateAdded { get; set; }
        public DateTime? DateModified { get; set; }

        public virtual ICollection<Quote> Quotes { get; set; }
    }
}
