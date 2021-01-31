using System;
using System.Collections.Generic;

namespace Web.Api.Infrastructure.Data.Entities
{
    public partial class PhoneType
    {
        public PhoneType()
        {
            Phone = new HashSet<Phone>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Phone> Phone { get; set; }
    }
}
