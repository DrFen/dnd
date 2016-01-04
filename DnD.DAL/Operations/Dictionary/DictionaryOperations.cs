using System;
using System.Collections.Generic;
using System.Linq;
using DnD.Core.Enums;
using DnD.Core.REST;
using DnD.DAL.Entities.Dictonary;
using DnD.DAL.Interfaces;
using DnD.DAL.Interfaces.Dictionary;
using DnD.DAL.Models.Dictionary;
using DnD.DAL.Repositories.General;

namespace DnD.DAL.Operations.Dictionary
{
    public class DictionaryOperations : IDictionaryOperations
    {
        private readonly IEntityDb<Race> _raceContext;
        private readonly IEntityDb<Subrace> _subraceContext;

        public DictionaryOperations(IEntityDb<Race> raceContext,
                                    IEntityDb<Subrace> subraceContext)
        {
            _raceContext = raceContext;
            _subraceContext = subraceContext;
        }

        public Response<bool> DeleteEntity<T>(Guid id, IEntityDb<T> context ) where T: class , IEntity
        {
            try
            {
                context.Delete(id);
            }
            catch (Exception)
            {
                return new Response<bool>(true, (int)ErrorEnum.HasReferences, "Удаление невозможно");
            }
            return new Response<bool>(true);
        }

        #region Race
        public Response<List<RaceListModel>> GetRaceList()
        {
            return new Response<List<RaceListModel>>
            {
                ErrorCode = (int)ErrorEnum.Ok,
                ErrorMessage = "",
                Value = _raceContext.GetList().List().
                Select(s => new RaceListModel { Id = s.Id, Name = s.Name, Description = s.Description })
                .OrderBy(o => o.Name)
                .ToList()

            };
        }

        public Response<bool> UpdateRace(RaceListModel updateModel)
        {

            var currentEntity = updateModel.Id == null ? new Race() : _raceContext.GetById((Guid)updateModel.Id);

            currentEntity.Name = updateModel.Name;
            currentEntity.Description = updateModel.Description ?? "";
            _raceContext.Upsert(currentEntity);
            return new Response<bool>(true);
        }

        public Response<bool> DeleteRace(Guid id)
        {
            return DeleteEntity(id, _raceContext);
        }
        #endregion

        #region Subrace
       public Response<List<SubraceListModel>> GetSubraceList()
        {
            return new Response<List<SubraceListModel>>
            {
                ErrorCode = (int) ErrorEnum.Ok,
                ErrorMessage = "",
                Value = (from subrace in _subraceContext.GetList().List()
                    join race in _raceContext.GetList().List() on subrace.RaceId equals race.Id
                    orderby race.Name, subrace.Name
                    select new SubraceListModel
                    {
                        Id = subrace.Id,
                        Name = subrace.Name,
                        Description = subrace.Description,
                        RaceId = race.Id,
                        RaceName = race.Name
                    }
                    ).ToList()

            };
        }

        public Response<bool> UpdateSubrace(SubraceListModel updateModel)
        {

            var currentEntity = updateModel.Id == null ? new Subrace() : _subraceContext.GetById((Guid)updateModel.Id);

            currentEntity.Name = updateModel.Name;
            currentEntity.Description = updateModel.Description ?? "";
            currentEntity.RaceId = updateModel.RaceId;
            _subraceContext.Upsert(currentEntity);
            return new Response<bool>(true);
        }
        public Response<bool> DeleteSubrace(Guid id)
        {
            return DeleteEntity(id, _subraceContext);
        }
        #endregion
    }
}
