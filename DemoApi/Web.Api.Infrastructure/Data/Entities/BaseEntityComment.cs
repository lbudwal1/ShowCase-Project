using System;
using System.Collections.Generic;

namespace Web.Api.Infrastructure.Data.Entities
{
    public partial class BaseEntityComment
    {
        public BaseEntityComment()
        {
            InverseBaseEntityCommentNavigation = new HashSet<BaseEntityComment>();
        }

        public int AboutId { get; set; }
        public int Id { get; set; }
        public int PostedById { get; set; }
        public int? ParentCommentId { get; set; }
        public string CommentText { get; set; }
        public DateTime DateAdded { get; set; }

        public virtual BaseEntity About { get; set; }
        public virtual BaseEntityComment BaseEntityCommentNavigation { get; set; }
        public virtual BaseEntity PostedBy { get; set; }
        public virtual ICollection<BaseEntityComment> InverseBaseEntityCommentNavigation { get; set; }
    }
}
