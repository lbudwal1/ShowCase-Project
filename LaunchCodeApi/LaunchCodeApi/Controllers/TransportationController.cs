
using System;
using System.Linq;
using LaunchCodeApi.Model;
using LaunchCodeApi.Model.DTO;
using LaunchCodeApi.Presenters;
using Microsoft.AspNetCore.Mvc;

namespace LaunchCodeApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransportationController : ControllerBase
    {
        LaunchCodeContext db = new LaunchCodeContext();
        JsonResponse response = new JsonResponse();

        [HttpPost("GetTransportation")]
        [Produces("application/json")]
        public IActionResult GetTransportation()
        {
            APIByIdObjectResponse ard = new APIByIdObjectResponse();

            try
            {
                var data = db.Transportations.ToList().ToDictionary(x => x.Id, x => x);

                ard.ObjectsArray = data;
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
