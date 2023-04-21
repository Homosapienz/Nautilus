namespace Nautilus.Model.Taxon
{
    public record TaxonClass
    {
        private string _id;
        private string _name;
        public string Id
        {
            get { return _id; }
            set { _id = value.Trim(); }
        }
        public string Name
        {
            get { return _name; }
            set { _name = value.Trim(); }
        }
    }
}
