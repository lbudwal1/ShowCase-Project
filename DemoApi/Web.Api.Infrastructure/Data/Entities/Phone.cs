using System;
using System.Collections.Generic;

namespace Web.Api.Infrastructure.Data.Entities
{
    public partial class Phone
    {
        public int BaseEntityId { get; set; }
        public int PhoneTypeId { get; set; }
        public string PhoneNumber { get; set; }

        public virtual BaseEntity BaseEntity { get; set; }
        public virtual PhoneType PhoneType { get; set; }
    }
}
