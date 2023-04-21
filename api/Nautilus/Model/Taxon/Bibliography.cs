namespace Nautilus.Model.Taxon
{
    public record BibliographicSource
    {
        private string _code;
        private string _author;
        private string _year;
        private string _sbj;

        public string Code
        {
            get { return _code.Trim(); }
            set { _code = value; }
        }
        public string Author
        {
            get { return _author.Trim(); }
            set { _author = value; }
        }
        public string Year
        {
            get { return _year.Trim(); }
            set { _year = value; }
        }
        public string Sbj
        {
            get { return _sbj.Trim(); }
            set { _sbj = value; }
        }
    }

    public record BibliographicRequest
    {
        public string Code { get; set; }
        public string Author { get; set; }
        public string Quote { get; set; }
        public string Year { get; set; }
        public string Subject { get; set; }
    }
}
