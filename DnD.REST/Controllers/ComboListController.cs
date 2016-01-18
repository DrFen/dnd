using System.Collections.Generic;
using System.Web.Http;
using DnD.Core.REST;
using DnD.DAL.Entities.Dictonary;
using DnD.DAL.Enum;
using DnD.DAL.Interfaces.Operations;
using DnD.DAL.Models;
using DnD.DAL.Operations.Helpers;

namespace DnD.REST.Controllers
{
    [RoutePrefix("api/Combo")]
    public class ComboListController : ApiController
    {
        private readonly IDictionaryOperations _dictionaryOperations;

        public ComboListController(IDictionaryOperations dictionaryOperations)
        {
            _dictionaryOperations = dictionaryOperations;
        }

        [Route("Race")]
        [HttpPost]
        public Response<List<ComboListModel>> RaceList(Request<bool> req)
        {

            return new Response<List<ComboListModel>>(ComboValuesGetter<Race>.GetCombo());
        }

        [Route("Subrace")]
        [HttpPost]
        public Response<List<ComboListModel>> SubaceList(Request<bool> req)
        {

            return _dictionaryOperations.GetSubraceCombo();
        }

        [Route("ItemType")]
        [HttpPost]
        public Response<List<ComboListModel>> ItemTypeList(Request<bool> req)
        {

            return new Response<List<ComboListModel>>(ComboValuesGetter<ItemType>.GetCombo());
        }

        
        [Route("AttributeFunction")]
        [HttpPost]
        public Response<List<ComboListModel>> AttributeFunctionList(Request<bool> req)
        {

            return new Response<List<ComboListModel>>(AttributeFunction.GetList());
        }

        [Route("AttributeType")]
        [HttpPost]
        public Response<List<ComboListModel>> AttributeTypeList(Request<bool> req)
        {

            return new Response<List<ComboListModel>>(ComboValuesGetter<DictionaryAttributeType>.GetCombo());
        }
    }
}
