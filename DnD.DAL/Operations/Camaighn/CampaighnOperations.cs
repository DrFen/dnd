using System;
using System.Collections.Generic;
using System.Linq;
using DnD.Core.Enums;
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
        private readonly IEntityDb<CampaighnRace> _campaighnRaceContext;

        public CampaighnOperations(IEntityDb<Campaighn> campaighnContext,
                                    IEntityDb<CampaighnRace> campaighnRaceContext)
        {
            _campaighnContext = campaighnContext;
            _campaighnRaceContext = campaighnRaceContext;
            _campaighnRaceContext.SetSession(_campaighnContext.GetSession());
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

        public Response<List<Guid>> GetRace(Guid campaighnId)
        {
            return new Response<List<Guid>>(
                _campaighnRaceContext.GetList()
                    .List()
                    .Where(w => w.CampaighnId == campaighnId)
                    .Select(s => s.SubraceId)
                    .ToList()
                );
        }

        public Response<bool> UpdateCampaighn(CampaighnEditModel model)
        {
            if((model.StartLevel??1) < 1 || (model.StartLevel ?? 1) > 100)
                return new Response<bool>(false, (int)ErrorEnum.Aplied, "Уровень должен быть в диапазоне 1-99");

            var transaction = _campaighnContext.StartTransaction();
            
            var currentEntity = model.Id == null ? new Campaighn() : _campaighnContext.GetById((Guid)model.Id);
            var campaighnId = model.Id ?? Guid.NewGuid();

            currentEntity.Name = model.Name;
            currentEntity.StartLevel = model.StartLevel??1;

            IEnumerable<CampaighnRace> newRaces;

            if (!model.Id.Equals(null))
            {
                var oldRaces =
                    _campaighnRaceContext.GetList()
                        .List()
                        .Where(w => w.CampaighnId.Equals(model.Id) && !model.Subraces.Contains(w.SubraceId));
                foreach (var oldRace in oldRaces)
                {
                    _campaighnRaceContext.Delete(oldRace);
                }

                newRaces =
                    model.Subraces.Where(
                        w =>
                            !_campaighnRaceContext.GetList()
                                .List()
                                .Where(ww => ww.CampaighnId.Equals(model.Id))
                                .Select(ss => ss.SubraceId)
                                .ToList()
                                .Contains(w)).Select(s => new CampaighnRace
                                {
                                    CampaighnId = campaighnId,
                                    SubraceId = s
                                });

            }
            else
            {
                newRaces = model.Subraces.Select(s => new CampaighnRace
                {
                    CampaighnId = campaighnId,
                    SubraceId = s

                });
            }

            foreach (var newRace in newRaces)
            {
                _campaighnRaceContext.Upsert(newRace);
            }
            

            transaction.Commit();
            return new Response<bool>();
        }
    }
}
