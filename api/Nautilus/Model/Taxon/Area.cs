namespace Nautilus.Model.Taxon
{
    public record Area
    {
        public string RegionCode { get; set; }
        public string RegionName { get; set; }
        public string CountryCode { get; set; }
        public string CountryName { get; set; }
    }
}
