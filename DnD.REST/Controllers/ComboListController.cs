using System.Collections.Generic;
using System.Web.Http;
using DnD.Core.REST;
using DnD.DAL.Entities.Dictonary;
using DnD.DAL.Models;
using DnD.DAL.Operations.Helpers;

namespace DnD.REST.Controllers
{
    [RoutePrefix("api/Combo")]
    public class ComboListController : ApiController
    {
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

            return new Response<List<ComboListModel>>(ComboValuesGetter<Subrace>.GetCombo());
        }

        [Route("ItemType")]
        [HttpPost]
        public Response<List<ComboListModel>> ItemTypeList(Request<bool> req)
        {

            return new Response<List<ComboListModel>>(ComboValuesGetter<ItemType>.GetCombo());
        }
    }
}
