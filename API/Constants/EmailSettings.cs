using System.ComponentModel.DataAnnotations;

namespace API.Constants;

public class EmailSettings
{
    public const string SectionName = nameof(EmailSettings);

    [Required]
    public string Host { get; set; }

    [Required]
    public string Password { get; set; }

    [Required]
    //[Range(4, 4, "Port must have only 4 numbers.")]
    public int Port { get; set; }

    [Required]
    public string Username { get; set; }
}