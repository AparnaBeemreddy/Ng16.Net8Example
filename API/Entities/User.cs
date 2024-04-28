using System;

namespace API.Entities;

public class User
{
    public int Id { get; set; }
	public string UserName { get; set; } = string.Empty;
	public byte[] PasswordHash { get; set; }
	public byte[] PasswordSalt { get; set; }
	public string RefreshToken { get; set; } = string.Empty;
	public DateTime TokenCreated { get; set; }
	public DateTime TokenExpires { get; set; }
}
