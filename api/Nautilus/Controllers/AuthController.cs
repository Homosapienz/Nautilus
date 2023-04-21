using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System.Security.Principal;
using Nautilus.Model;
using Nautilus.Helpers;

namespace Nautilus.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private UserTokenInfo ut;
        public AuthController(IConfiguration _config) {
            var conf = (IConfigurationRoot)_config;
            ut = new UserTokenInfo(
                conf["Token:issuer"],
                conf["Token:audience"],
                conf["Token:secretKey"]
            );
        }
        
        [HttpGet]
        public string Get()
        {
            return User.Identity is WindowsIdentity ?
                JsonConvert.SerializeObject(TokenHelper.GetUserAccessToken(User, ut)) : null;
        }

    }
}
