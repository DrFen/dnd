using System;
using System.Collections.Generic;
using System.Web.Http;
using DnD.Core.REST;
using DnD.DAL.Interfaces.Dictionary;
using DnD.DAL.Models.Dictionary;

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

        #region Race
        [Route("RaceList")]
        [HttpPost]
        public Response<List<RaceListModel>> RaceList(Request<string> req)
        {

            return _dictionaryOperations.GetRaceList();
        }

        [Route("RaceEdit")]
        [HttpPost]
        public Response<bool> RaceEdit(Request<RaceListModel> req)
        {

            return _dictionaryOperations.UpdateRace(req.Value);
        }

        [Route("RaceDelete")]
        [HttpPost]
        public Response<bool> RaceEdit(Request<Guid> req)
        {

            return _dictionaryOperations.DeleteRace(req.Value);
        }
        #endregion

        #region Subrace
        [Route("SubraceList")]
        [HttpPost]
        public Response<List<SubraceListModel>> SubraceList(Request<bool> req)
        {

            return _dictionaryOperations.GetSubraceList();
        }

        [Route("SubraceEdit")]
        [HttpPost]
        public Response<bool> SubraceEdit(Request<SubraceListModel> req)
        {

            return _dictionaryOperations.UpdateSubrace(req.Value);
        }

        [Route("SubraceDelete")]
        [HttpPost]
        public Response<bool> SubraceDelete(Request<Guid> req)
        {

            return _dictionaryOperations.DeleteSubrace(req.Value);
        }
        #endregion
    }
}
