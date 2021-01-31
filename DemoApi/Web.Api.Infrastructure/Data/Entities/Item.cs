using System;
using System.Collections.Generic;

namespace Web.Api.Infrastructure.Data.Entities
{
    public partial class Item
    {
        public int Id { get; set; }
        public int CategoryId { get; set; }
        public string StockNumber { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }

        public virtual Category Category { get; set; }
    }
}
