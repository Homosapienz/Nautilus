namespace Nautilus.Model
{
    public class UserTokenInfo
    {
        public UserTokenInfo(string issuerId, string audience, string key)
        {
            IssuerId = issuerId;
            Audience = audience;
            Key = key;
        }

        public string IssuerId { get; set; }
        public string Audience { get; set; }
        public string Key { get; set; }
    }
}
