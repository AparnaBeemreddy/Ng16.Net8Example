using API.Constants;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController(DataContext dataContext, IConfiguration configuration)
        : ControllerBase
    {
        [HttpPost("register")]
        public async Task<User> Register(UserDTO user)
        {
            CreatePasswordHash(user.Password, out byte[] passwordHash, out byte[] passwordSalt);

            var newUser = new User
            {
                UserName = user.Username,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt
            };

            await dataContext.Users.AddAsync(newUser);
            await dataContext.SaveChangesAsync();

            return newUser;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserDTO request)
        {
            var user = await dataContext.Users.Where(u => u.UserName == request.Username).FirstOrDefaultAsync();

            if (user == null)
            {
                return BadRequest("Invalid Username/Password."); //User not found.
            }

            if (!VerifyPasswordHash(request.Password, user.PasswordHash, user.PasswordSalt))
            {
                return BadRequest("Invalid Username/Password."); //Incorrect password.
            }

            string token = CreateToken(user);
            var newRefreshToken = GenerateRefreshToken();
            SetRefreshToken(newRefreshToken, user);

            await dataContext.SaveChangesAsync();

            return Ok(token);
        }

        [HttpPost("refresh-token")]
        public async Task<ActionResult<string>> RefreshToken()
        {
            var refreshToken = Request.Cookies[Cookies.RefreshToken];
            if (string.IsNullOrEmpty(refreshToken))
            {
                return Unauthorized("Invalid Refresh Token.");
            }

            var user = await dataContext.Users.Where(u => u.UserName == Request.Cookies[Cookies.Name]).FirstOrDefaultAsync();

            if (!user.RefreshToken.Equals(refreshToken))
            {
                return Unauthorized("Invalid Refresh Token.");
            }
            else if (user.TokenExpires < DateTime.Now)
            {
                return Unauthorized("Token expired.");
            }

            string token = CreateToken(user);
            var newRefreshToken = GenerateRefreshToken();
            SetRefreshToken(newRefreshToken, user);

            await dataContext.SaveChangesAsync();

            return Ok(newRefreshToken.Token);
        }

        private void SetRefreshToken(RefreshToken newRefreshToken, User user)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = newRefreshToken.TokenExpires
            };

            Response.Cookies.Append(Cookies.RefreshToken, newRefreshToken.Token, cookieOptions);
            Response.Cookies.Append(Cookies.Name, user.UserName, cookieOptions);

            user.RefreshToken = newRefreshToken.Token;
            user.TokenCreated = newRefreshToken.TokenCreated;
            user.TokenExpires = newRefreshToken.TokenExpires;
        }

        private static RefreshToken GenerateRefreshToken()
        {
            var refreshToken = new RefreshToken
            {
                Token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64)),
                TokenCreated = DateTime.Now,
                TokenExpires = DateTime.Now.AddDays(7)
            };

            return refreshToken;
        }

        private string CreateToken(User user)
        {
            List<Claim> claims = [
                new(ClaimTypes.Name, user.UserName),
                new(ClaimTypes.Role, "Admin")
            ];

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                configuration.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds);

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }

        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using var hmac = new HMACSHA512();
            passwordSalt = hmac.Key;
            passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
        }

        private static bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using var hmac = new HMACSHA512(passwordSalt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            return computedHash.SequenceEqual(passwordHash);
        }
    }
}
