using API.Constants;
using API.DTOs;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using MimeKit.Text;

namespace API.Services.EmailService
{
    public class EmailService(IOptions<EmailSettings> emailSettings) : IEmailService
    {
        public void SendEmail(EmailDTO emailDTO)
        {
            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse(emailSettings.Value.Username));
            email.To.Add(MailboxAddress.Parse(emailDTO.To));
            email.Subject = emailDTO.Subject;
            email.Body = new TextPart(TextFormat.Html) { Text = emailDTO.Body };

            using var smtp = new SmtpClient();
            smtp.Connect(emailSettings.Value.Host, emailSettings.Value.Port, SecureSocketOptions.StartTls);
            smtp.Authenticate(emailSettings.Value.Username, emailSettings.Value.Password);
            smtp.Send(email);
            smtp.Disconnect(true);
        }
    }
}
