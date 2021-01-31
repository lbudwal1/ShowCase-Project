using System;
using System.Collections.Generic;

namespace Web.Api.Infrastructure.Data.Entities
{
    public partial class StoreLocationCustomer
    {
        public int StoreLocationId { get; set; }
        public int CustomerId { get; set; }

        public virtual Customer Customer { get; set; }
        public virtual StoreLocation StoreLocation { get; set; }
    }
}
