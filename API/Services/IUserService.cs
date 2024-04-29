using API.Entities;

namespace API.Services
{
    public interface IUserService
    {
        Task<IEnumerable<User>> GetAll();
        Task<User> GetById(int id);
        Task<User> GetByName(string username);
        string GetMyName();
        Task Add(User user);
        void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt);
        bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt);
        string CreateToken(User user, string configToken);
        RefreshToken GenerateRefreshToken();
        Task<User> SetRefreshToken(RefreshToken newRefreshToken, User user, CookieOptions cookieOptions);
    }
}
