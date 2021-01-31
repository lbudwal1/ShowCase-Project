using System;
using System.Collections.Generic;

namespace Web.Api.Infrastructure.Data.Entities
{
    public partial class Country
    {
        public Country()
        {
            Address = new HashSet<Address>();
            District = new HashSet<District>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Address> Address { get; set; }
        public virtual ICollection<District> District { get; set; }
    }
}
