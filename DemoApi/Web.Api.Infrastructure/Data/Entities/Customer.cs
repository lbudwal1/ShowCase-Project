using System;
using System.Collections.Generic;

namespace Web.Api.Infrastructure.Data.Entities
{
    public partial class Customer
    {
        public Customer()
        {
            StoreLocationCustomer = new HashSet<StoreLocationCustomer>();
        }

        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public virtual BaseEntity BaseEntity { get; set; }
        public virtual ICollection<StoreLocationCustomer> StoreLocationCustomer { get; set; }
    }
}
