using API.Data;
using API.Entities;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

//[Authorize]
[ApiController]
[Route("api/[controller]")]
public class UserController(DataContext dataContext, IUserService userService) : ControllerBase
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

    [HttpGet("get-me")]
    public ActionResult<string> GetMe()
    {
        var userName = userService.GetMyName();
        return userName;
    }
}
