using System;
using System.Collections.Generic;

namespace Web.Api.Infrastructure.Data.Entities
{
    public partial class Address
    {
        public int BaseEntityId { get; set; }
        public int AddressTypeId { get; set; }
        public string Line1 { get; set; }
        public string Line2 { get; set; }
        public string PostalArea { get; set; }
        public int? CityId { get; set; }
        public int? DistrictId { get; set; }
        public int? CountryId { get; set; }

        public virtual AddressType AddressType { get; set; }
        public virtual BaseEntity BaseEntity { get; set; }
        public virtual City City { get; set; }
        public virtual Country Country { get; set; }
        public virtual District District { get; set; }
    }
}
