using System;
using System.Collections.Generic;

namespace Web.Api.Infrastructure.Data.Entities
{
    public partial class AddressType
    {
        public AddressType()
        {
            Address = new HashSet<Address>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Address> Address { get; set; }
    }
}
