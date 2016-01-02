using System.Collections.Generic;
using System.Linq;
using DnD.Core.Enums;
using DnD.Core.REST;
using DnD.DAL.Entities.Dictonary;
using DnD.DAL.Models.UserAccess.List.Dictionary;
using DnD.DAL.Repositories.General;

namespace DnD.DAL.Operations.Dictionary
{
    public class DictionaryOperations : IDictionaryOperations
    {
        private readonly IEntityDb<Race> _raceContext;

        public DictionaryOperations(IEntityDb<Race> raceContext)
        {
            _raceContext = raceContext;
        }

        public Response<List<RaceListModel>> GetRaceList()
        {
            return new Response<List<RaceListModel>>
            {
                ErrorCode = (int)ErrorEnum.Ok,
                ErrorMessage = "",
                Value = _raceContext.GetList().List().
                Select(s => new RaceListModel { Id = s.Id, Name = s.Name }).ToList()

            };
        }

    }
}
