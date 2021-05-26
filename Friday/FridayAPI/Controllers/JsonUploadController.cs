using FridayAPI.Services.TemplateEngine;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace FridayAPI.Common.JsonParser
{
    [Route("api/[controller]")]
    [ApiController]
    public class JsonUploadController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public JsonUploadController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost]
        public IActionResult Post([FromBody] JObject body)
        {
            try
            {
                Console.WriteLine(body);

                JToken contents = body["docContents"];

                string docName = (string)body["docName"];

                TemplateEngine te = new TemplateEngine();
                te.GenerateWordFile($"Uploads/{body["docName"]}", $"GeneratedFiles/target-{docName}", contents);

                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet]
        public IActionResult Download([FromQuery] string fileName)
        {
            var stream = new FileStream($"GeneratedFiles/target-{fileName}", FileMode.Open);

            if (stream == null)
                return NotFound();

            return File(stream, "application/octet-stream");
        }
    }
}
