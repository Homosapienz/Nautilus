using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace Nautilus.Model.Taxon
{
    public record TaxonResult
    {
        public readonly KeyValuePair<string, string> Group;
        public readonly KeyValuePair<string, string> SubGroup;
        public readonly KeyValuePair<string, string> Genus;
        public readonly KeyValuePair<string, string> Species;
        public readonly KeyValuePair<string, string> SubSpecies;
        public readonly ICollection<Image> Images;

        public TaxonResult()
        {

        }
    }
}
