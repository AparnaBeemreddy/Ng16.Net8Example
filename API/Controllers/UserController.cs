using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController(DataContext dataContext) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<User>>> GetAll()
    {
        return await dataContext.Users.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<User>> GetById(int id)
    {
        return await dataContext.Users.FindAsync(id);
    }

    [HttpPost]
    public async Task Register(string username, string password)
    {
        var newUser = new User
        {
            UserName = username,
            Password = password
        };
        await dataContext.Users.AddAsync(newUser);
    }
}
