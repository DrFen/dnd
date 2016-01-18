using System;
using System.Collections.Generic;
using System.Linq;
using DnD.Core.Enums;
using DnD.Core.REST;
using DnD.DAL.Entities.Dictonary;
using DnD.DAL.Interfaces;
using DnD.DAL.Interfaces.Operations;
using DnD.DAL.Models;
using DnD.DAL.Models.Dictionary.Edit;
using DnD.DAL.Models.Dictionary.List;
using DnD.DAL.Repositories.General;

namespace DnD.DAL.Operations.Dictionary
{
    public class DictionaryOperations : IDictionaryOperations
    {
        private readonly IEntityDb<Race> _raceContext;
        private readonly IEntityDb<Subrace> _subraceContext;
        private readonly IEntityDb<ItemType> _itemTypeContext;

        public DictionaryOperations(IEntityDb<Race> raceContext,
                                    IEntityDb<Subrace> subraceContext,
                                    IEntityDb<ItemType> itemTypeContext)
        {
            _raceContext = raceContext;
            _subraceContext = subraceContext;
            _itemTypeContext = itemTypeContext;

            _subraceContext.SetSession(_raceContext.GetSession());
            _itemTypeContext.SetSession(_raceContext.GetSession());
        }

        public Response<bool> DeleteEntity<T>(Guid id, IEntityDb<T> context) where T : class, IEntity
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
                ErrorCode = (int)ErrorEnum.Ok,
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

        public Response<List<ComboListModel>> GetSubraceCombo()
        {
            return new Response<List<ComboListModel>>(_subraceContext.GetList().List()
                .Join(_raceContext.GetList().List(),
                    sub => sub.RaceId,
                    race => race.Id,
                    (sub, race) => new ComboListModel
                    {
                        Id = sub.Id,
                        Name = race.Name + " - " + sub.Name
                    }).ToList());
        }
        #endregion

        #region ItemType

        public Response<List<ItemTypeListModel>> ItemTypeList()
        {
            var originalList = _itemTypeContext.GetList().List().ToList();

            return new Response<List<ItemTypeListModel>>
            {
                ErrorCode = (int) ErrorEnum.Ok,
                ErrorMessage = "",
                Value = originalList.Where(w => w.RootId.Equals(null)).Select(s => new ItemTypeListModel
                {
                    Id = s.Id,
                    Name = s.Name,
                    Description = s.Description,
                    Plural = s.Plural,
                    RootId = s.RootId,
                    Nodes = AddToAnswer(originalList, s.Id)
                }).ToList()
            };
        }

        private List<ItemTypeListModel> AddToAnswer(List<ItemType> originalList, Guid addedId)
        {
            var childList = originalList.Where(w => w.RootId.Equals(addedId)).ToList();

            if (!childList.Any())
                return new List<ItemTypeListModel>();

            return childList.Select(child => new ItemTypeListModel
            {
                Id = child.Id,
                Name = child.Name,
                Description = child.Description,
                Plural = child.Plural,
                RootId = child.RootId,
                Nodes = AddToAnswer(originalList, child.Id)
            }).ToList();
        }

        public Response<bool> UpdateItemType(ItemTypeEditModel updateModel)
        {

            var currentEntity = updateModel.Id == null
                ? new ItemType()
                : _itemTypeContext.GetById((Guid) updateModel.Id);

            currentEntity.Name = updateModel.Name;
            currentEntity.Description = updateModel.Description ?? "";
            currentEntity.RootId = updateModel.RootId;
            currentEntity.Plural = updateModel.Plural;
            _itemTypeContext.Upsert(currentEntity);
            return new Response<bool>(true);
        }

        public Response<bool> DeleteItemType(Guid id)
        {
            return DeleteEntity(id, _itemTypeContext);
        }
        #endregion
    }
}
