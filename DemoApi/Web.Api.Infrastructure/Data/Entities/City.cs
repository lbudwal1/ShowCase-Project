using System;
using System.Collections.Generic;

namespace Web.Api.Infrastructure.Data.Entities
{
    public partial class City
    {
        public City()
        {
            Address = new HashSet<Address>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public int DistrictId { get; set; }

        public virtual District District { get; set; }
        public virtual ICollection<Address> Address { get; set; }
    }
}
