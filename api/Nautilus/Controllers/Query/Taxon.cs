
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Nautilus.Data;
using Nautilus.Model;
using Nautilus.Services;
using Nautilus.Model.Taxon;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using System.Linq;

namespace Nautilus.Controllers.Query
{
    [Route("api/query/[controller]")]
    [ApiController]
    public class Taxon : Controller
    {
        private readonly INautilusDatabase _database;
        private readonly IDataService _dataService;
        private readonly ILogger<Taxon> _logger;

        public Taxon(IDataService _dataservice, ILogger<Taxon> logger) { 
        
            _dataService = _dataservice;
            _logger = logger;
        }

        [HttpGet]
        public void Get([FromBody] TaxonFilter filter) {

            //IEnumerable<TaxonResult> def = 
            //    _database.GetTaxon(filter);
        }

        [Route("groups")]
        [HttpGet]
        public IEnumerable<TaxonClass> RetrieveGroups()
        {
            return _dataService.GetGroups();
        }

        [Route("subgroups/{groupId}")]
        [HttpGet]
        public IEnumerable<TaxonClass> RetrieveSubgroups(string groupId) {
            return _dataService.GetSubgroups(groupId);
        }

        [Route("genus/{groupId}/{subgroupId}")]
        [HttpGet]
        public IEnumerable<TaxonClass> RetrieveGenus(string groupId, string subgroupId) {
            return _dataService.GetGenus(groupId, subgroupId);
        }

        [Route("species/{groupId}/{subgroupId}/{genusId}")]
        [HttpGet]
        public IEnumerable<TaxonClass> RetrieveSpecies(string groupId, string subgroupId, string genusId)
        {
            return _dataService.GetSpecies(groupId, subgroupId, genusId);
        }

        [Route("subspecies/{groupId}/{subgroupId}/{genusId}/{speciesId}")]
        [HttpGet]
        public IEnumerable<TaxonClass> RetrieveSubspecies(string groupId, string subgroupId, string genusId, string speciesId)
        {
            return _dataService.GetSubspecies(groupId, subgroupId, genusId, speciesId);
        }

        [Route("areas")]
        [HttpGet]
        public IEnumerable<Area> RetrieveAreas() {
            return _dataService.GetAreas().OrderBy(a => a.CountryName);
        }

        [Route("diagnostic/{groupId}/{subgroupId}")]
        [HttpGet]
        public IEnumerable<DiagnosticCharacter> RetrieveDiagnostics(string groupId, string subgroupId)
        {
            return _dataService.GetDiagnosticChars(groupId, subgroupId);
        }

        [Route("icons/{groupId}/{subgroupId}")]
        [HttpGet]
        public IEnumerable<Icon> RetrieveIcons(string groupId, string subgroupId) { 
            return _dataService.GetIcons(groupId, subgroupId);
        }

        [Route("bibliographic")]
        [HttpPost]
        public IEnumerable<BibliographicSource> RetrieveBibliographicSources
            ([FromBody] BibliographicRequest request) {
            return _dataService.GetBibliographicSources(request);
        }

        [Route("stratigraphy/age")]
        [HttpGet]
        public IEnumerable<Age> RetrieveAges() { 
            return _dataService.GetStratigraphicalAges();
        }

        [Route("stratigraphy/bio")]
        [HttpGet]
        public IEnumerable<Biozone> RetrieveBiozones() {
            return _dataService.GetStratigraphicalBiozones();
        }
    }
}
