using API.DTOs;
using API.Services.EmailService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class EmailController(IEmailService emailService) : ControllerBase
    {
        [HttpPost]
        public IActionResult SendEmail(string body)
        {
            emailService.SendEmail(new EmailDTO(
                "cyrus.hammes@ethereal.email",
                "Test Email subject",
                body
                ));

            return Ok();
        }
    }
}
