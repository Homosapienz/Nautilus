using System;

namespace Nautilus.Model.Taxon
{
    public record Image
    {
        public string Path { get; set; }
        public string FileName { get; set; }
        public string Locality { get; set; }
        public string Age { get; set; }
        public DateTime Date { get; set; }

    }

    public record Icon {
        private string _filename;
        public DiagnosticCharacter Character { get; set; }
        public string FileName {
            get { return _filename.Trim(); }
            set { _filename = value; }
        }
        public int Row { get; set; }
        public int Column { get; set; }
    }

}
