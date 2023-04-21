using Nautilus.Model.Taxon;
using System.Linq;
using System.Collections.Generic;
using System.Text;
using System.Data.Common;
using System.Reflection;
using System;

namespace Nautilus.Model
{
    
    public class TaxonDescription
    {
        public TaxonClass Group { get; set; }
        public TaxonClass Subgroup { get; set; }
        public TaxonClass Genus { get; set; }
        public TaxonClass Species { get; set; }
        public TaxonClass SubSpecies { get; set; }
    }
    public record TaxonFilter { 
        public IEnumerable<string> Areas { get; init; }
        public TaxonDescription Description { get; init; }
        public IEnumerable<string> DiagnosticCharacters { get; init; }
        public Stratigraphy Stratigraphy { get; init; }
        public string BibliographicSource { get; init; }
    }
    public class Stratigraphy {
        public enum StratigraphyType { 
            Age = 0,
            Biozones = 1
        }
        public StratigraphyType Type { get; set; }
        public string Top { get; set; }
        public string Bottom { get; set; }
    }
    

    
    /*
     public interface IFilter {
        string ToSql();
    }

    public class EqualityFilter<T> : IFilter { 
        
        T Value { get; set; }
        public string ToSql() { return ""; }
    }
      [Filter(ColumnName = "Area", Type = typeof(string))]
    public record FilterValueSingle { 
        public object Value { get; set; }
    }

    [AttributeUsage(AttributeTargets.Class, AllowMultiple = false)]
    public class FilterAttribute : Attribute { 
        public string ColumnName { get; set; }
        public Type Type { get; set; }
    }
      
     
    public record TaxonFilter
    {
        public TaxonDefinitionFilter Definition { get; set; }
        public AreaFilter AreaFilter { get; set; }
        public DiagnosticCharacterFilter DiagnosticCharacters { get; set; }

        public TaxonFilter() {
            
        }
    }
    public record TaxonDefinitionFilter
    {
        public string group { get; set; }
        public string subgroup { get; set; }
        public string genus { get; set; }
        public string species { get; set; }
        public string subspecies { get; set; }

    }
    public record AreaFilter { 
        public IDictionary<string, string> Areas { get; set; }
    }
    public record DiagnosticCharacterFilter { 
        public ICollection<string> DiagnosticCodes { get; set; }
    }
    public class EqualityFilter<T> where T : class {

        public readonly T filterObj;
        public void ToSql() {
            
        }

        public EqualityFilter(T filterObj) {
            PropertyInfo[] infos = filterObj.GetType().GetProperties();
            foreach(PropertyInfo info in infos)
            {

                bool arr = info.PropertyType.Is;
            }
        }
    }
    */
}
