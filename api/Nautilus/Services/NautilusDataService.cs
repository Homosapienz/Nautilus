using System;
using Nautilus.Data;
using Microsoft.Extensions.Logging;
using Nautilus.Model;
using Microsoft.Extensions.Options;
using static Nautilus.Data.NautilusDbContext;
using System.Collections.Generic;
using System.Linq;
using System.Data;
using Nautilus.Model.Taxon;

namespace Nautilus.Services
{
    public interface IDataService {
        IEnumerable<TaxonClass> GetGroups();
        IEnumerable<TaxonClass> GetSubgroups(string groupId);
        IEnumerable<TaxonClass> GetGenus(string groupId, string subgroupId);
        IEnumerable<TaxonClass> GetSpecies(string groupId, string subgroupId, string genusId);
        IEnumerable<TaxonClass> GetSubspecies(string groupId, string subgroupId, string genusId, string speciesId);
        IEnumerable<Area> GetAreas();
        IEnumerable<DiagnosticCharacter> GetDiagnosticChars(string GroupId, string SubgroupId);
        IEnumerable<Icon> GetIcons(string GroupId, string SubgroupId);
        IEnumerable<BibliographicSource> GetBibliographicSources(BibliographicRequest request);
        IEnumerable<Age> GetStratigraphicalAges();
        IEnumerable<Biozone> GetStratigraphicalBiozones();

    }
    public class NautilusDataService : IDisposable, IDataService
    {
        private NautilusDbContext _context;
        private readonly ILogger<NautilusDbContext> _logger;

        public NautilusDataService(IOptions<DatabaseSettings> dbSettings, ILoggerFactory loggerFactory) {
            _logger = loggerFactory.CreateLogger<NautilusDbContext>();
            _context = new NautilusDbContext(dbSettings, loggerFactory);
        }
        public void Dispose()
        {
            _context.Dispose();
        }

        public IEnumerable<TaxonClass> GetGroups() { 
            var data = _context.GetTaxonGroups();
            foreach (DataRow group in data.Tables[0].Rows) {
                yield return new TaxonClass() { 
                    Id = group["C_GRUPPO"].ToString(), 
                    Name = group["GRUPPO"].ToString() 
                };
            }
        }
        public IEnumerable<TaxonClass> GetSubgroups(string groupId) {
            var data = _context.GetTaxonSubGroups(groupId);
            foreach (DataRow group in data.Tables[0].Rows) {
                yield return new TaxonClass() { 
                    Id = group["C_SOTTOGRUPPO"].ToString(), 
                    Name = group["SOTTOGRUPPO"].ToString() 
                };
            }
        }
        public IEnumerable<TaxonClass> GetGenus(string groupId, string subgroupId) { 
            var data = _context.GetTaxonGenus(groupId, subgroupId);
            foreach (DataRow group in data.Tables[0].Rows) {
                yield return new TaxonClass() {
                    Id = group["C_GENERE"].ToString(),
                    Name = group["GENERE"].ToString()
                };
            }
        }
        public IEnumerable<TaxonClass> GetSpecies(string groupId, string subgroupId, string genusId) {
            var data = _context.GetTaxonSpecies(groupId, subgroupId, genusId);
            foreach (DataRow group in data.Tables[0].Rows) {
                yield return new TaxonClass() {
                    Id = group["C_SPECIE"].ToString(),
                    Name = group["SPECIE"].ToString()
                };
            }
        }

        public IEnumerable<TaxonClass> GetSubspecies(string groupId, string subgroupId, string genusId, string speciesId) {
            var data = _context.GetTaxonSubspecies(groupId, subgroupId, genusId, speciesId);
            foreach (DataRow group in data.Tables[0].Rows)
            {
                yield return new TaxonClass()
                {
                    Id = group["C_SOTTOSPECIE"].ToString(),
                    Name = group["SOTTOSPECIE"].ToString()
                };
            }
        }

        public IEnumerable<Area> GetAreas() {
            var data = _context.GetAreas();
            foreach (DataRow area in data.Tables[0].Rows) {
                yield return new Area()
                {
                    RegionCode = area["C_AREA_GEN"].ToString().Trim(),
                    RegionName = area["Region"].ToString().Trim(),
                    CountryCode = area["C_AREA_DET"].ToString().Trim(),
                    CountryName = area["Area"].ToString().Trim()
                };
            }
        }

        public IEnumerable<DiagnosticCharacter> GetDiagnosticChars(string GroupId, string SubgroupId) { 
            var data = _context.GetDiagnosticCharacters(GroupId, SubgroupId);
            foreach(DataRow diag in data.Tables[0].Rows){
                yield return new DiagnosticCharacter()
                {
                    GroupId = diag["C_GRUPPO"].ToString(),
                    SubgroupId = diag["C_SOTTOGRUPPO"].ToString(),
                    Code = diag["C_DIAG"].ToString(),
                    Description = diag["DESCR_DIAG"].ToString()
                };
            }
        }

        public IEnumerable<Icon> GetIcons(string GroupId, string SubgroupId) { 
            var data = _context.GetIcons(GroupId, SubgroupId);
            foreach(DataRow icon in data.Tables[0].Rows) {
                yield return new Icon() {
                    Character = new DiagnosticCharacter()
                    {
                        GroupId = icon["C_GRUPPO"].ToString(),
                        SubgroupId = icon["C_SOTTOGRUPPO"].ToString(),
                        Code = icon["C_DIAG"].ToString(),
                        Description = icon["DESCR_DIAG"].ToString()
                    },
                    FileName = icon["FILE_NM"].ToString(),
                    Row = int.Parse(icon["RIGA"].ToString()),
                    Column = int.Parse(icon["COLONNA"].ToString())
                };
                
            }
        }
        public IEnumerable<BibliographicSource> GetBibliographicSources(BibliographicRequest request) {
            var data = _context.GetBibliographicSources(request);
            foreach(DataRow bibl in data.Tables[0].Rows) {
                yield return new BibliographicSource() {
                    Code = bibl["C_BIBL"].ToString(),
                    Author = bibl["AUTORE"].ToString(),
                    Year = bibl["ANNO"].ToString(),
                    Sbj = bibl["SBJ"].ToString()
                };
            }
        }

        public IEnumerable<Age> GetStratigraphicalAges() { 
            var data = _context.GetAges();
            foreach(DataRow age in data.Tables[0].Rows) {
                yield return new Age() { 
                    Source = age["C_SOURCE"].ToString(),
                    Code = age["C_ETA"].ToString(),
                    Erathema = age["ERATEMA"].ToString(),
                    Systeme = age["SISTEMA"].ToString(),
                    Series = age["SERIE"].ToString(),
                    Stage = age["PIANO"].ToString(),
                    Top =  decimal.Parse(age["TOP"].ToString()),
                    Bottom =  decimal.Parse(age["BOTTOM"].ToString()),
                };
            }
        }

        public IEnumerable<Biozone> GetStratigraphicalBiozones()
        {
            var data = _context.GetBiozones();
            foreach (DataRow bio in data.Tables[0].Rows)
            {
                yield return new Biozone()
                {
                    Source = bio["C_SOURCE"].ToString(),
                    Code = bio["C_BIO"].ToString(),
                    Name = bio["BIOZONA"].ToString(),
                    Top = decimal.Parse(bio["TOP"].ToString()),
                    Bottom = decimal.Parse(bio["BOTTOM"].ToString()),
                };
            }
        }
    }
}
