using System.Security.Claims;

namespace API.Services
{
    public class UserService(IHttpContextAccessor httpContextAccessor) : IUserService
    {
        public string GetMyName()
        {
            var result = string.Empty;
            if(httpContextAccessor.HttpContext!=null)
            {
                result=httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Name);
            }
            return result;
        }
    }
}
