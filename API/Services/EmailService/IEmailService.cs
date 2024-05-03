using API.DTOs;
using API.Entities;

namespace API.Services.EmailService
{
    public interface IEmailService
    {
       void SendEmail(EmailDTO emailDTO);
    }
}
