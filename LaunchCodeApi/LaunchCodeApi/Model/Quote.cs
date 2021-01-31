using System;

#nullable disable

namespace LaunchCodeApi.Model
{
    public partial class Quote
    {
        public int Id { get; set; }
        public int QuoteStatus { get; set; }
        public int CustomerId { get; set; }
        public int DepartureId { get; set; }
        public int DestinationId { get; set; }
        public int NumberOfTravellers { get; set; }
        public int TransportationId { get; set; }
        public DateTime DepatureDate { get; set; }
        public DateTime? ReturnDate { get; set; }
        public DateTime DateAdded { get; set; }
        public DateTime? DateModified { get; set; }

        public virtual Customer Customer { get; set; }
        public virtual Airport Departure { get; set; }
        public virtual Airport Destination { get; set; }
        public virtual Transportation Transportation { get; set; }
    }
}
