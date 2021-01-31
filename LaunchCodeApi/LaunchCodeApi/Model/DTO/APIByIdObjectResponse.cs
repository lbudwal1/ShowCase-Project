using Newtonsoft.Json;

namespace LaunchCodeApi.Model.DTO
{
    public sealed class APIByIdObjectResponse
    {
        [JsonProperty("objectsArray")]
        public dynamic ObjectsArray { get; set; }

        [JsonProperty("totalRecords")]
        public int? TotalRecords { get; set; }

        [JsonProperty("message")]
        public string Message { get; set; }
    }
}
