using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MimeKit;
using MimeKit.Text;

namespace API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class EmailController : ControllerBase
    {
        [HttpPost]
        public IActionResult SendEmail(string body)
        {
            const string username = "twila.buckridge@ethereal.email";
            const string password = "PMgQyrtbQSyqwsyTZr";
            const string host = "smtp.ethereal.email";
            const int port = 587;

            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse(username));
            email.To.Add(MailboxAddress.Parse(username));
            email.Subject = "Test Email subject";
            email.Body = new TextPart(TextFormat.Html) { Text = body };

            using var smtp = new SmtpClient();
            smtp.Connect(host, port, SecureSocketOptions.StartTls);
            smtp.Authenticate(username, password);
            smtp.Send(email);
            smtp.Disconnect(true);

            return Ok();
        }
    }
}
