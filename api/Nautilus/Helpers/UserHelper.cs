using System.DirectoryServices.AccountManagement;
using System.Security.Claims;
using System.Security.Principal;

namespace Nautilus.Helpers
{
    public class UserHelper
    {
        public static UserPrincipal FindByClaims(ClaimsPrincipal principal)
        {
            UserPrincipal user = null;

            WindowsIdentity identity = (WindowsIdentity)principal.Identity;
            PrincipalContext context = new PrincipalContext(ContextType.Domain, identity.Name.Split("\\")[0]);

            if (context != null)
                user = UserPrincipal.FindByIdentity(context, identity.Name);

            return user;
        }
    }
}
