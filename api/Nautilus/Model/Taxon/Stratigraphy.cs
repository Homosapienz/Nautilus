namespace Nautilus.Model.Taxon
{

    public abstract record Stratigraphy {

        private string _source;
        private string _code;
        public string Source {
            get { 
                return _source.Trim();
            }
            set { 
                _source= value;
            }
        }
        public string Code {
            get
            {
                return _code.Trim();
            }
            set
            {
                _code = value;
            }
        }
        public decimal Top { get; set; }
        public decimal Bottom { get; set; }
    }
    public record Age : Stratigraphy
    {
        private string _erathema;
        private string _systeme;
        private string _series;
        private string _stage;

        public string Erathema {
            get
            {
                return _erathema.Trim();
            }
            set
            {
                _erathema = value;
            }
        }
        public string Systeme {
            get
            {
                return _systeme.Trim();
            }
            set
            {
                _systeme = value;
            }
        }
        public string Series {
            get
            {
                return _series.Trim();
            }
            set
            {
                _series = value;
            }
        }
        public string Stage {
            get
            {
                return _stage.Trim();
            }
            set
            {
                _stage = value;
            }
        }
    }

    public record Biozone : Stratigraphy
    {
        private string _name;
        public string Name {
            get
            {
                return _name.Trim();
            }
            set
            {
                _name = value;
            }
        }
    }
}
