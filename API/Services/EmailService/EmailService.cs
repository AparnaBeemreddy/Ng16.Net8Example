using API.Data;
using API.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace API.Services.EmailService
{
    public class EmailService(DataContext dataContext, IHttpContextAccessor httpContextAccessor) : IEmailService
    {
        public async Task<IEnumerable<User>> GetAll()
        {
            return await dataContext.Users.ToListAsync();
        }

        public async Task<User> GetById(int id)
        {
            return await dataContext.Users.FindAsync(id);
        }

        public async Task<User> GetByName(string username)
        {
            return await dataContext.Users.Where(u => u.UserName == username).FirstOrDefaultAsync();
        }

        public string GetMyName()
        {
            var result = string.Empty;
            if (httpContextAccessor.HttpContext != null)
            {
                result = httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Name);
            }
            return result;
        }

        public async Task Add(User user)
        {
            await dataContext.Users.AddAsync(user);
            await dataContext.SaveChangesAsync();
        }

        public void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using var hmac = new HMACSHA512();
            passwordSalt = hmac.Key;
            passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
        }

        public bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using var hmac = new HMACSHA512(passwordSalt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            return computedHash.SequenceEqual(passwordHash);
        }

        public string CreateToken(User user, string configToken)
        {
            List<Claim> claims = [
                new(ClaimTypes.Name, user.UserName),
                new(ClaimTypes.Role, "Admin")
            ];

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configToken));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds);

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }

        public RefreshToken GenerateRefreshToken()
        {
            var refreshToken = new RefreshToken
            {
                Token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64)),
                TokenCreated = DateTime.Now,
                TokenExpires = DateTime.Now.AddDays(7)
            };

            return refreshToken;
        }

        public async Task<User> SetRefreshToken(RefreshToken newRefreshToken, User user)
        {
            user.RefreshToken = newRefreshToken.Token;
            user.TokenCreated = newRefreshToken.TokenCreated;
            user.TokenExpires = newRefreshToken.TokenExpires;

            await dataContext.SaveChangesAsync();

            return user;
        }
    }
}
