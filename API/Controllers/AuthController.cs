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
                return BadRequest("User not found");
            }

            if (!VerifyPasswordHash(request.Password, user.PasswordHash, user.PasswordSalt))
            {
                return BadRequest("Incorrect password");
            }

            string token = CreateToken(user);

            //var newRefreshToken = GenerateRefreshToken();
            //SetRefreshToken(newRefreshToken);

            //user.RefreshToken = newRefreshToken;
            //user.TokenCreated = DateTime.Now;
            //user.TokenExpires = DateTime.Now.AddDays(1);

            //await dataContext.SaveChangesAsync();

            return Ok(token);
        }

        [HttpPost("refresh-token")]
        public async Task<ActionResult<string>> RefreshToken()
        {
            var refreshToken = Request.Cookies["refreshToken"];

            var user = await dataContext.Users.Where(u => u.UserName == Request.Cookies["Name"]).FirstOrDefaultAsync();

            if (!user.RefreshToken.Equals(refreshToken))
            {
                return Unauthorized("Invalid Refresh Token");
            }

            return Ok(refreshToken);
        }

        private void SetRefreshToken(string newRefreshToken)
        {
            throw new NotImplementedException();
        }

        private string GenerateRefreshToken()
        {
            throw new NotImplementedException();
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
