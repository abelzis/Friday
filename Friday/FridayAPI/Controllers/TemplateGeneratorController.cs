using FridayAPI.Services.TemplateEngine;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;

namespace FridayAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TemplateGeneratorController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public TemplateGeneratorController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost]
        public JsonResult Post()
        {
            var templateEngine = new TemplateEngine();
            try
            {
                templateEngine.GenerateWordFile($"./doctemplate.docx", $"./target.docx");
            }
            catch (Exception e)
            {
                return new JsonResult($"Error: {e.Message}");
            }
            return new JsonResult("Success");
        }
    }
}
