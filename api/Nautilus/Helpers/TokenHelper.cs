using System.Security.Claims;
using System.Security.Principal;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using System;
using System.Collections.Generic;
using System.DirectoryServices.AccountManagement;
using Nautilus.Model;
using Microsoft.AspNetCore.Mvc;

namespace Nautilus.Helpers
{
    public class TokenHelper
    {
        private const string NameClaimType = "nameid";
        public static UserInfo GetUserAccessToken(ClaimsPrincipal principal, UserTokenInfo tokenInfo)
        {
            var user = UserHelper.FindByClaims(principal);
            if (user == null)
                return null;

            WindowsIdentity identity = (WindowsIdentity)principal.Identity;

            Claim[] claims = identity != null ? GetWindowsIdentityClaims(identity) : null;
            return new UserInfo()
            {
                token = UserToken(claims, tokenInfo),
                Logon = identity.Name,
                Name = user.DisplayName,
                Email = user.EmailAddress
            };
        }
        private static Claim[] GetWindowsIdentityClaims(WindowsIdentity identity) =>
            new Claim[]
            {
                new Claim(NameClaimType, identity?.User.Value.ToLower()),
                new Claim("nii", "urn:office:idp:activedirectory") // forse questa è solo per sharepoint
            };
        private static string UserToken(IEnumerable<Claim> claims, UserTokenInfo info) { 
            var Key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(info.Key));
            var credentials = new SigningCredentials(Key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: info.IssuerId,
                audience: info.Audience,
                claims: claims,
                expires: DateTime.UtcNow.AddHours(8),
                signingCredentials: credentials
                );

            var handler = new JwtSecurityTokenHandler();
            return handler.WriteToken(token);
        }

    }
    
}
