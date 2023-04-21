using Microsoft.Extensions.Logging;
using Nautilus.Controllers.Query;
using Nautilus.Data;
using Nautilus.Model;

namespace Nautilus.Helpers
{
    public class DataHelper
    {
        private readonly INautilusDatabase _database;
        private readonly ILogger<Taxon> _logger;
        public DataHelper(INautilusDatabase db, ILogger<Taxon> logger)
        {
            _database = db;
            _logger = logger;
        }

    }
}
