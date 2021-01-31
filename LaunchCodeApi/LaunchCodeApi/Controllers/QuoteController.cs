using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LaunchCodeApi.Model;
using LaunchCodeApi.Model.DTO;
using LaunchCodeApi.Model.Request;
using LaunchCodeApi.Presenters;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LaunchCodeApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuoteController : ControllerBase
    {
        LaunchCodeContext db = new LaunchCodeContext();
        JsonResponse response = new JsonResponse();

        [HttpPost("GetQuotes")]
        [Produces("application/json")]
        public async Task<IActionResult> GetQuotes([FromBody] GetQuoteRequest request)
        {
            APIByIdObjectResponse ard = new APIByIdObjectResponse();

            try
            {
                int total = db.Quotes.Where((x) => request.Deleted == false ? x.QuoteStatus == (int)QuoteStatus.SUCCEEDED : x.QuoteStatus == (int)QuoteStatus.DELETED).Count();

                var data = await db.Quotes
                 .Include((x) => x.Customer).Include((x) => x.Departure).Include((x) => x.Destination).Include((x) => x.Transportation)
                 .Where((x) => request.Id != null ? x.Id == request.Id : true)
                 .Where((x) => request.Deleted == false ? x.QuoteStatus == (int)QuoteStatus.SUCCEEDED : x.QuoteStatus == (int)QuoteStatus.DELETED)
                 .Where((x) => request.Keywords.Length > 0 ? x.Customer.FirstName.Contains(request.Keywords) : true)
                 .Skip((request.PageSize ?? 20) * ((request.PageNumber ?? 0) - 1))
                 .Take(request.PageSize ?? 20)
                 .ToListAsync();

                List<QuoteDTO> qut = new List<QuoteDTO>();

                data.ForEach((x) =>
                {
                    qut.Add(new QuoteDTO()
                    {
                        Id = x.Id,
                        DepatureId = x.DepartureId,
                        DestinationId = x.DestinationId,
                        TransportationId = x.TransportationId,
                        NumberOfTravellers = x.NumberOfTravellers,
                        DepatureDate = x.DepatureDate,
                        ReturnDate = x.ReturnDate,
                        DateAdded = x.DateAdded,
                        DateModified = x.DateModified,
                        Customer = new CustomerDTO()
                        {
                            Id = x.Customer.Id,
                            FirstName = x.Customer.FirstName,
                            LastName = x.Customer.LastName,
                            PhoneNumber = x.Customer.PhoneNumber,
                            Email = x.Customer.Email,
                            Address = x.Customer.Address,
                        },
                        Depature = new AirportDTO()
                        {
                            Id = x.Departure.Id,
                            Name = x.Departure.Name,
                            Code = x.Departure.Code,
                            CountryCode = x.Departure.CountryCode,
                            CountryName = x.Departure.CountryName,
                            StateCode = x.Departure.StateCode
                        },
                        Destination = new AirportDTO()
                        {
                            Id = x.Destination.Id,
                            Name = x.Destination.Name,
                            Code = x.Destination.Code,
                            CountryCode = x.Destination.CountryCode,
                            CountryName = x.Destination.CountryName,
                            StateCode = x.Destination.StateCode
                        },
                    });
                });

                ard.ObjectsArray = qut.ToDictionary(x => x.Id, x => x);
                ard.TotalRecords = total;
                ard.Message = "Success";

            }
            catch (Exception ex)
            {
                ard.Message = ex.Message.ToString();
            }

            return response.JsonReturn(ard, 200);
        }

        [HttpPost("AddQuote")]
        [Produces("application/json")]
        public async Task<IActionResult> AddQuote([FromBody] AddEditQuote request)
        {
            APIByIdObjectResponse ard = new APIByIdObjectResponse();

            try
            {
                DateTime? nullDate = null;

                db.Quotes.Add(new Quote()
                {
                    DepartureId = request.DepatureId,
                    DestinationId = request.DestinationId,
                    NumberOfTravellers = request.NumberOfTravellers,
                    TransportationId = request.TransportationId,
                    QuoteStatus = (int)QuoteStatus.SUCCEEDED,
                    DepatureDate = Convert.ToDateTime(request.DepatureDate),
                    ReturnDate = request.ReturnDate.Length > 0 ? Convert.ToDateTime(request.ReturnDate) : nullDate,
                    DateAdded = DateTime.UtcNow,
                    Customer = new Customer()
                    {
                        FirstName = request.Customer.FirstName,
                        LastName = request.Customer.LastName,
                        PhoneNumber = request.Customer.PhoneNumber,
                        Email = request.Customer.Email,
                        Address = request.Customer.Address,
                        DateAdded = DateTime.UtcNow
                    }
                });

                await db.SaveChangesAsync();

                ard.Message = "Success";

            }
            catch (Exception ex)
            {
                ard.Message = ex.Message.ToString();
            }

            return response.JsonReturn(ard, 200);
        }

        [HttpPost("EditQuote")]
        [Produces("application/json")]
        public async Task<IActionResult> EditQuote([FromBody] AddEditQuote request)
        {
            APIByIdObjectResponse ard = new APIByIdObjectResponse();

            try
            {
                Quote data = db.Quotes.Where((x) => x.Id == request.Id && x.QuoteStatus != (int)QuoteStatus.DELETED).Include((x) => x.Customer).FirstOrDefault();
                DateTime? nullDate = null;

                data.DepartureId = request.DepatureId;
                data.DestinationId = request.DestinationId;
                data.NumberOfTravellers = request.NumberOfTravellers;
                data.TransportationId = request.TransportationId;
                data.DepatureDate = Convert.ToDateTime(request.DepatureDate);
                data.ReturnDate = request.ReturnDate != null ? Convert.ToDateTime(request.ReturnDate) : nullDate;
                data.DateModified = DateTime.UtcNow;
                data.Customer.FirstName = request.Customer.FirstName;
                data.Customer.LastName = request.Customer.LastName;
                data.Customer.PhoneNumber = request.Customer.PhoneNumber;
                data.Customer.Email = request.Customer.Email;
                data.Customer.Address = request.Customer.Address;
                data.Customer.DateModified = DateTime.UtcNow;

                await db.SaveChangesAsync();
                ard.Message = "Success";

            }
            catch (Exception ex)
            {
                ard.Message = ex.Message.ToString();
            }

            return response.JsonReturn(ard, 200);
        }

        [HttpPost("DeleteQuote")]
        [Produces("application/json")]
        public async Task<IActionResult> DeleteQuote([FromBody] DeleteQuote request)
        {
            APIByIdObjectResponse ard = new APIByIdObjectResponse();

            try
            {
                db.Quotes.Where((x) => x.Id == request.Id).FirstOrDefault().QuoteStatus = (int)QuoteStatus.DELETED;
                await db.SaveChangesAsync();

                ard.Message = "Success";

            }
            catch (Exception ex)
            {
                ard.Message = ex.Message.ToString();
            }

            return response.JsonReturn(ard, 200);
        }
    }
}
