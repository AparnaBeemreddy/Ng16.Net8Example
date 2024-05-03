using API.Constants;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Services.UserService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController(IUserService userService, IConfiguration configuration)
        : ControllerBase
    {
        [HttpPost("register")]
        public async Task<User> Register(UserDTO userDTO)
        {
            userService.CreatePasswordHash(userDTO.Password, out byte[] passwordHash, out byte[] passwordSalt);

            var newUser = new User
            {
                UserName = userDTO.Username,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt
            };

            await userService.Add(newUser);

            return newUser;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserDTO userDTO)
        {
            var user = await userService.GetByName(userDTO.Username);

            if (user == null)
            {
                return BadRequest("Invalid Username/Password."); //User not found.
            }

            if (!userService.VerifyPasswordHash(userDTO.Password, user.PasswordHash, user.PasswordSalt))
            {
                return BadRequest("Invalid Username/Password."); //Incorrect password.
            }

            string jwt = userService.CreateToken(user, configuration.GetSection("AppSettings:Token").Value);
            var newRefreshToken = userService.GenerateRefreshToken();

            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = newRefreshToken.TokenExpires
            };
            user = await userService.SetRefreshToken(newRefreshToken, user);

            Response.Cookies.Append(Cookies.RefreshToken, user.RefreshToken, cookieOptions);
            Response.Cookies.Append(Cookies.Name, user.UserName, cookieOptions);

            return Ok(jwt);
        }

        [HttpPost("refresh-token")]
        public async Task<ActionResult<string>> RefreshToken()
        {
            var refreshToken = Request.Cookies[Cookies.RefreshToken];
            if (string.IsNullOrEmpty(refreshToken))
            {
                return Unauthorized("Invalid Refresh Token.");
            }

            var user = await userService.GetByName(Request.Cookies[Cookies.Name]);

            if (!user.RefreshToken.Equals(refreshToken))
            {
                return Unauthorized("Invalid Refresh Token.");
            }
            else if (user.TokenExpires < DateTime.Now)
            {
                return Unauthorized("Token expired.");
            }

            string jwt = userService.CreateToken(user, configuration.GetSection("AppSettings:Token").Value);
            var newRefreshToken = userService.GenerateRefreshToken();

            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = newRefreshToken.TokenExpires
            };
            user = await userService.SetRefreshToken(newRefreshToken, user);

            Response.Cookies.Append(Cookies.RefreshToken, user.RefreshToken, cookieOptions);
            Response.Cookies.Append(Cookies.Name, user.UserName, cookieOptions);

            return Ok(jwt);
        }
    }
}
