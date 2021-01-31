using System;
using System.Collections.Generic;

#nullable disable

namespace LaunchCodeApi.Model
{
    public partial class Airport
    {
        public Airport()
        {
            QuoteDepartures = new HashSet<Quote>();
            QuoteDestinations = new HashSet<Quote>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public string StateCode { get; set; }
        public string CountryCode { get; set; }
        public string CountryName { get; set; }

        public virtual ICollection<Quote> QuoteDepartures { get; set; }
        public virtual ICollection<Quote> QuoteDestinations { get; set; }
    }
}
