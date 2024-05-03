using API.Data;
using API.Entities;
using API.Services.UserService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class UserController(IUserService userService) : ControllerBase
{
    [HttpGet, Authorize(Roles = "Admin")]
    public async Task<ActionResult<IEnumerable<User>>> GetAll()
    {
        var users = await userService.GetAll();
        return Ok(users);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<User>> GetById(int id)
    {
        return await userService.GetById(id);
    }

    [HttpGet("get-me")]
    public ActionResult<string> GetMe()
    {
        var userName = userService.GetMyName();
        return userName;
    }
}
