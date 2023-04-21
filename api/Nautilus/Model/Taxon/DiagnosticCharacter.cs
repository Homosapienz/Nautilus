namespace Nautilus.Model.Taxon
{
    public record DiagnosticCharacter
    {

        private string _code;
        private string _description;
        public string GroupId { get; set; }
        public string SubgroupId { get; set; }
        public string Code
        {
            get
            {
                return _code.Trim();
            }
            set
            {
                _code = value;
            }
        }
        public string Description
        {
            get
            {
                return _description.Trim();
            }
            set
            {
                _description = value;
            }
        }
    }
}
