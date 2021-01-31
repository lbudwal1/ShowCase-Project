using System;
using System.Collections.Generic;

namespace Web.Api.Infrastructure.Data.Entities
{
    public partial class StoreLocation
    {
        public StoreLocation()
        {
            StoreLocationCustomer = new HashSet<StoreLocationCustomer>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual BaseEntity IdNavigation { get; set; }
        public virtual ICollection<StoreLocationCustomer> StoreLocationCustomer { get; set; }
    }
}
