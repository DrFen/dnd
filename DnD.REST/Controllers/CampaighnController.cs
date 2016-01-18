using System;
using System.Collections.Generic;
using System.Web.Http;
using DnD.Core.REST;
using DnD.DAL.Interfaces.Operations;
using DnD.DAL.Models.Campaighn;

namespace DnD.REST.Controllers
{
    [RoutePrefix("api/Campaighn")]
    public class CampaighnController : ApiController
    {
        private readonly ICampaighnOperations _campaighnOperations;

        public CampaighnController(ICampaighnOperations campaighnOperations)
        {
            _campaighnOperations = campaighnOperations;
        }

        [Route("List")]
        [HttpPost]
        public Response<List<CampaighnListAnswer>> CampaighnList(Request<bool> req)
        {
            return _campaighnOperations.GetList(req.GetUserKey(Request));
        }

        [Route("RaceList")]
        [HttpPost]
        public Response<List<Guid>> RaceList(Request<Guid> req)
        {
            return _campaighnOperations.GetRace(req.Value);
        }

        [Route("Edit")]
        [HttpPost]
        public Response<bool> EditCampaighn(Request<CampaighnEditModel> req)
        {
            return _campaighnOperations.UpdateCampaighn(req.Value);
        }
    }
}
