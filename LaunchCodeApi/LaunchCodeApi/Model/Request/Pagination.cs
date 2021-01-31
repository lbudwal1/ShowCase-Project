using System;

namespace LaunchCodeApi.Model.Request
{
    public class PaginationRequest
    {
        public String Keywords { get; set; }
        public int? PageNumber { get; set; }
        public int? PageSize { get; set; }
    }

    public class GetQuoteRequest : PaginationRequest
    {
        public bool Deleted { get; set; }
        public int? Id { get; set; }
    }

    public class GetAirportRequest : PaginationRequest
    {
        public int? Id { get; set; }
    }
}
