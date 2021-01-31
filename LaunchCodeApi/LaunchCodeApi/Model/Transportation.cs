using System;
using System.Collections.Generic;

#nullable disable

namespace LaunchCodeApi.Model
{
    public partial class Transportation
    {
        public Transportation()
        {
            Quotes = new HashSet<Quote>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsActive { get; set; }
        public DateTime DateAdded { get; set; }
        public DateTime? DateModified { get; set; }

        public virtual ICollection<Quote> Quotes { get; set; }
    }
}
