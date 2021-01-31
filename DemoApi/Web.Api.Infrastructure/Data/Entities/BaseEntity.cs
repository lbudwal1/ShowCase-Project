using System;
using System.Collections.Generic;

namespace Web.Api.Infrastructure.Data.Entities
{
    public partial class BaseEntity
    {
        public BaseEntity()
        {
            Address = new HashSet<Address>();
            BaseEntityCommentAbout = new HashSet<BaseEntityComment>();
            BaseEntityCommentPostedBy = new HashSet<BaseEntityComment>();
            Phone = new HashSet<Phone>();
        }

        public int Id { get; set; }
        public int? PreferredPhoneTypeId { get; set; }

        public virtual Customer IdNavigation { get; set; }
        public virtual StoreLocation StoreLocation { get; set; }
        public virtual ICollection<Address> Address { get; set; }
        public virtual ICollection<BaseEntityComment> BaseEntityCommentAbout { get; set; }
        public virtual ICollection<BaseEntityComment> BaseEntityCommentPostedBy { get; set; }
        public virtual ICollection<Phone> Phone { get; set; }
    }
}
