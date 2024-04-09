using System;

namespace API.Entities;

public class User
{
    public int Id { get; set; }
	public string UserName { get; set; }
	public string Password { get; set; }
	//public string PasswordHash { get; set; }
	//public string PasswordSalt { get; set; }
}
