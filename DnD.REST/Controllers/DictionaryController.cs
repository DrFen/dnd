using System;
using System.Collections.Generic;
using System.Web.Http;
using DnD.Core.REST;
using DnD.DAL.Interfaces.Operations;
using DnD.DAL.Models.Dictionary.Edit;
using DnD.DAL.Models.Dictionary.List;

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

        #region ItemType
        [Route("ItemTypeList")]
        [HttpPost]
        public Response<List<ItemTypeListModel>> ItemTypeList(Request<bool> req)
        {

            return _dictionaryOperations.ItemTypeList();
        }

        [Route("ItemTypeEdit")]
        [HttpPost]
        public Response<bool> ItemTypeSave(Request<ItemTypeEditModel> req)
        {

            return _dictionaryOperations.UpdateItemType(req.Value);
        }

        [Route("ItemTypeDelete")]
        [HttpPost]
        public Response<bool> ItemTypeDelete(Request<Guid> req)
        {

            return _dictionaryOperations.DeleteItemType(req.Value);
        }
        #endregion
    }
}
