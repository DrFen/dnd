using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DnD.Core.REST;
using DnD.DAL.Models.UserAccess.List;
using DnD.DAL.Models.UserAccess.List.Dictionary;
using DnD.DAL.Operations.Dictionary;

namespace DnD.REST.Controllers
{
    [RoutePrefix("api/Dictionary")]
    public class DictionaryController : ApiController
    {

        private readonly IDictionaryOperations _dictionaryOperations;

        public DictionaryController(IDictionaryOperations dictionaryOperations)
        {
            _dictionaryOperations = dictionaryOperations;
        }

        [Route("RaceList")]
        [HttpPost]
        public Response<List<RaceListModel>> TestApi(Request<string> req)
        {

            return _dictionaryOperations.GetRaceList();
        }
    }
}
