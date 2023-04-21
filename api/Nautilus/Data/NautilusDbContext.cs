using System;
using System.Data;
using System.Collections.Generic;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Nautilus.Model;
using Nautilus.Model.Taxon;
using Oracle.ManagedDataAccess.Client;

namespace Nautilus.Data
{
    public class NautilusDbContext : IDisposable, INautilusDatabase
    {
        public class DatabaseSettings {
            public string ConnectionString { get; set; }
        }
        public NautilusDbContext(IOptions<DatabaseSettings> dbSettings, ILoggerFactory loggerFactory)
            : this(loggerFactory)
        {
            _conn = new OracleConnection(dbSettings.Value.ConnectionString);
        }
        public NautilusDbContext(ILoggerFactory loggerFactory)
        {
            _logger = loggerFactory.CreateLogger<NautilusDbContext>();
        }

        private readonly OracleConnection _conn;
        private bool disposedValue;
        private readonly ILogger<NautilusDbContext> _logger;

        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    if (_conn != null)
                    {
                        _conn.Dispose();
                    }
                }

                disposedValue = true;
            }
        }
        public void Dispose()
        {
            // Do not change this code. Put cleanup code in 'Dispose(bool disposing)' method
            Dispose(disposing: true);
            GC.SuppressFinalize(this);
        }
        private void Open()
        {
            try {
                _logger.LogInformation($"Opening database");
                _logger.LogInformation($"Connection state <{_conn.State}>");
                if (_conn.State == ConnectionState.Closed)
                    _conn.Open();
                _logger.LogInformation($"[SERVICE : { _conn.ServiceName} - VERSION: { _conn.ServerVersion}]");
               _logger.LogInformation("Database connected");
            }
            catch(Exception ex) {
                _logger.LogError($"[{ex.GetType()}] An error occurred while opening Database: {ex.Message}");
                throw;
            }
        }
        private void Close() {
            try
            {
                _logger.LogInformation($"Closing database");
                _logger.LogInformation($"Connection state <{_conn.State}>");
                if (_conn.State == System.Data.ConnectionState.Open)
                    _conn.Close();
                _logger.LogInformation($"Database disconnected"); 
            }
            catch (Exception ex)
            {
                _logger.LogError($"[{ex.GetType()}] An error occurred while opening Database: {ex.Message}");
                throw;
            }
        }
        public DataSet ExecuteTextReader(string query)
        {
            try
            {
                Open();
                DataSet res = new DataSet();
                OracleCommand cmd = new OracleCommand(query, _conn);
                cmd.CommandType = System.Data.CommandType.Text;
                OracleDataAdapter oda = new OracleDataAdapter(cmd);
                oda.Fill(res);
                return res;
            }
            catch (OracleException oe)
            {
                _logger.LogError($"An Oracle exception has occurred: {oe.Message}");
                throw;
            }
            catch (Exception e)
            {
                _logger.LogError($"An exception has occurred: {e.Message}");
                throw;
            }
            finally {
                _logger.LogError($"Closing...");
                Close();
                Dispose();
            }
        }
        public DataSet GetTaxonGroups() {
            return ExecuteTextReader($"SELECT * FROM T_GROUP");
        }
        public DataSet GetTaxonSubGroups(string groupId) {
            return ExecuteTextReader($"SELECT * FROM T_SUBGROUP WHERE C_GRUPPO = '{ groupId }'");
        }
        public DataSet GetTaxonGenus(string groupId, string subgroupId) {
            return ExecuteTextReader($"SELECT * FROM T_GENUS WHERE C_GRUPPO = '{ groupId }' AND C_SOTTOGRUPPO = '{ subgroupId }'");
        }
        public DataSet GetTaxonSpecies(string groupId, string subgroupId, string genusId) {
            return ExecuteTextReader($"SELECT * FROM T_SPECIES WHERE C_GRUPPO = '{groupId}' AND C_SOTTOGRUPPO = '{subgroupId}' AND C_GENERE = '{genusId}'");
        }
        public DataSet GetTaxonSubspecies(string groupId, string subgroupId, string genusId, string speciesId) {
            return ExecuteTextReader($"SELECT * FROM T_TAXON S WHERE C_GRUPPO = '{groupId}' AND C_SOTTOGRUPPO = '{subgroupId}' AND C_GENERE = '{genusId}' AND C_SPECIE = '{speciesId}'");
        }
        public DataSet GetAreas() {
            return ExecuteTextReader($"SELECT A.C_AREA_GEN, B.AREA Region, null C_AREA_DET, null Area FROM T_AREAS_ASSN A, T_AREAS B WHERE   A.C_AREA_GEN = B.C_AREA UNION SELECT  ASN.C_AREA_GEN, A.AREA, ASN.C_AREA_DET, B.AREA FROM T_AREAS_ASSN ASN, T_AREAS A, T_AREAS B WHERE   A.C_AREA = ASN.C_AREA_GEN AND B.C_AREA = ASN.C_AREA_DET");
        }
        public DataSet GetDiagnosticCharacters(string GroupId, string SubgroupId) {
            return ExecuteTextReader($"SELECT * FROM T_DIAGNOSTIC_CHARACTERS_TYPE WHERE C_GRUPPO = '{GroupId}' AND C_SOTTOGRUPPO = '{SubgroupId}' order by PRIORITY, C_DIAG");
        }
        public DataSet GetIcons(string GroupId, string SubgroupId)
        {
            return ExecuteTextReader($"SELECT I.*, D.DESCR_DIAG FROM T_ICONS I JOIN T_DIAGNOSTIC_CHARACTERS_TYPE D ON D.C_DIAG = I.C_DIAG WHERE I.C_GRUPPO = '{GroupId}' AND I.C_SOTTOGRUPPO = '{SubgroupId}' ORDER BY RIGA, COLONNA");
        }
        public DataSet GetBibliographicSources(BibliographicRequest request) {
            List<string> clauses = new List<string>();
            if(!string.IsNullOrEmpty(request.Code)) 
                clauses.Add($"UPPER(C_BIBL) LIKE '%{request.Code.ToUpper()}%'");
            if(!string.IsNullOrEmpty(request.Author)) 
                clauses.Add($"UPPER(AUTORE) LIKE '%{request.Author.ToUpper()}%'");
            if(!string.IsNullOrEmpty(request.Year)) 
                clauses.Add($"UPPER(ANNO) LIKE '%{request.Year.ToUpper()}%'");
            if (!string.IsNullOrEmpty(request.Quote))
                clauses.Add($"UPPER(AUT_CIT) LIKE '%{request.Quote.ToUpper()}%'");
            if (!string.IsNullOrEmpty(request.Subject))
                clauses.Add($"UPPER(SBJ) LIKE '%{request.Subject.ToUpper()}%'");

            return ExecuteTextReader($"SELECT * FROM T_BIBLIOGRAPHIC_SOURCES { (clauses.Count > 0 ? "WHERE ": "") }{ string.Join(" OR ", clauses ) }");
        }
        public DataSet GetAges() {
            return ExecuteTextReader($"SELECT * FROM T_AGE ORDER BY TOP, BOTTOM");
        }
        public DataSet GetBiozones() {
            return ExecuteTextReader($"SELECT * FROM T_BIOZONE_TYPE ORDER BY TOP, BOTTOM");
        }
    }

    public interface INautilusDatabase {
        DataSet ExecuteTextReader(string query);
    }
}