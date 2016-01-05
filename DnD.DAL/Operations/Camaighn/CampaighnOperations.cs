using System.Collections.Generic;
using System.Linq;
using DnD.Core.REST;
using DnD.DAL.Entities.Campaighn;
using DnD.DAL.Interfaces.Operations;
using DnD.DAL.Models.Campaighn;
using DnD.DAL.Repositories.General;

namespace DnD.DAL.Operations.Camaighn
{
    public class CampaighnOperations : ICampaighnOperations
    {
        private readonly IEntityDb<Campaighn> _campaighnContext;

        public CampaighnOperations(IEntityDb<Campaighn> campaighnContext)
        {
            _campaighnContext = campaighnContext;
        }

        public Response<List<CampaighnListAnswer>> GetList(string userKey)
        {
            return
                new Response<List<CampaighnListAnswer>>(
                    _campaighnContext.GetList().List().Select(s => new CampaighnListAnswer
                    {
                        Name = s.Name,
                        Id = s.Id,
                        StartLevel = s.StartLevel
                    }).ToList());
        }
    }
}
