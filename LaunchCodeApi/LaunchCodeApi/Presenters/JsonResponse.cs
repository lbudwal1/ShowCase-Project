using LaunchCodeApi.Model.DTO;
using LaunchCodeApi.Serialization;
using Microsoft.AspNetCore.Mvc;

namespace LaunchCodeApi.Presenters
{
    public class JsonResponse
    {
        public ContentResult JsonReturn(APIByIdObjectResponse ard, int statusCode)
        {
            return new ContentResult()
            {
                ContentType = "application/json",
                StatusCode = statusCode,
                Content = JsonSerializer.SerializeObject(ard)
            };
        }
    }


}
