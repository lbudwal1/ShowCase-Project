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
    public class AiportController : ControllerBase
    {
        LaunchCodeContext db = new LaunchCodeContext();
        JsonResponse response = new JsonResponse();

        [HttpPost("GetAirports")]
        [Produces("application/json")]
        public async Task<IActionResult> GetAirports([FromBody] GetAirportRequest request)
        {
            APIByIdObjectResponse ard = new APIByIdObjectResponse();
            try
            {
                var data = await db.Airports
                .Where((x) => request.Keywords.Length > 0 ? x.Name.Contains(request.Keywords) : true)
                .Where((x) => request.Id != null ? x.Id == request.Id : true)
                .Skip((request.PageSize ?? 20) * ((request.PageNumber ?? 0) - 1))
                .Take(request.PageSize ?? 20).ToListAsync();

                List<AirportDTO> dto = new List<AirportDTO>();

                data.ForEach((x) =>
                {
                    dto.Add(new AirportDTO()
                    {
                        Id = x.Id,
                        Name = x.Name,
                        Code = x.Code,
                        CountryCode = x.CountryCode,
                        CountryName = x.CountryName,
                        StateCode = x.StateCode
                    });
                });

                ard.ObjectsArray = data.ToDictionary(x => x.Id, x => x);
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
