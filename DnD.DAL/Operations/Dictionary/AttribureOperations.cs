using System;
using System.Collections.Generic;
using System.Linq;
using DnD.Core.Enums;
using DnD.Core.REST;
using DnD.DAL.Entities.Dictonary.Attributes;
using DnD.DAL.Enum;
using DnD.DAL.Interfaces.Operations;
using DnD.DAL.Models.Dictionary;
using DnD.DAL.Models.Dictionary.Edit;
using DnD.DAL.Models.Dictionary.List;
using DnD.DAL.Operations.Helpers;
using DnD.DAL.Repositories.General;

namespace DnD.DAL.Operations.Dictionary
{
    public class AttribureOperations : IAttributeOperations
    {
        private readonly IEntityDb<DictionaryAttributeType> _dictionaryAttrTypeContext;
        private readonly IEntityDb<DictionaryAttribute> _dictionaryAttrContext;

        public AttribureOperations(IEntityDb<DictionaryAttributeType> dictionaryAttrTypeContext,
            IEntityDb<DictionaryAttribute> dictionaryAttrContext)
        {
            _dictionaryAttrTypeContext = dictionaryAttrTypeContext;
            _dictionaryAttrContext = dictionaryAttrContext;

            _dictionaryAttrContext.SetSession(_dictionaryAttrTypeContext.GetSession());
        }

        private List<AttributeTypeListModel> AddToAnswer(List<DictionaryAttributeType> originalList, Guid addedId)
        {
            var childList = originalList.Where(w => w.RootId.Equals(addedId)).ToList();

            if (!childList.Any())
                return new List<AttributeTypeListModel>();

            return childList.Select(child => new AttributeTypeListModel
            {
                Id = child.Id,
                Name = child.Name,
                RootId = child.RootId,
                Nodes = AddToAnswer(originalList, child.Id)
            })
            .OrderBy(o=>o.Name)
            .ToList();
        }

        public Response<List<AttributeTypeListModel>> GetTypesList()
        {
            var originalList = _dictionaryAttrTypeContext.GetList().List().ToList();
            return new Response<List<AttributeTypeListModel>>
                (
                originalList.Where(w => w.RootId.Equals(null)).Select(s => new AttributeTypeListModel
                {
                    Id = s.Id,
                    Name = s.Name,
                    RootId = s.RootId,
                    Nodes = AddToAnswer(originalList, s.Id)
                })
                .OrderBy(o=>o.Name)
                .ToList()
                );
        }

        public Response<List<AttributeListModel>> GetAttributeList(Guid? attributeTypeId)
        {
            return
                new Response<List<AttributeListModel>>(
                    _dictionaryAttrContext.GetList()
                        .List()
                        .Where(w => w.AttributeTypeId.Equals(attributeTypeId))
                        .Select(
                            s =>
                                new AttributeListModel
                                {
                                    Id = s.Id,
                                    Name = s.Name
                                })
                        .OrderBy(o => o.Name)
                        .ToList());
        }

        public Response<List<AttributeLinkModel>> GetAttributeSelectList(Guid? attributeTypeId)
        {
            return
                new Response<List<AttributeLinkModel>>(
                    _dictionaryAttrContext.GetList()
                        .List()
                        .Where(w => w.AttributeTypeId.Equals(attributeTypeId))
                        .Select(
                            s =>
                                new AttributeLinkModel
                                {
                                    Id = s.Id,
                                    Label = s.Name,
                                    Type = s.Type,
                                    Value = MultipleOperationsHelper.ConvertToType(s.Type, "")
                                })
                        .OrderBy(o => o.Label)
                        .ToList());
        }

        public Response<AttributeEditModel> GetAttributeEditModel(Guid attributeId)
        {
            if (attributeId.Equals(Guid.Empty))
                return new Response<AttributeEditModel>(null, (int) ErrorEnum.NotFound, "Запись не найдена");
            var entity = _dictionaryAttrContext.GetById(attributeId);
            return new Response<AttributeEditModel>(new AttributeEditModel
            {
                Id = entity.Id,
                Name = entity.Name,
                AttributeTypeId = entity.AttributeTypeId,
                Abbreviation = entity.Abbreviation,
                AttributeFunction = AttributeFunction.GetId(entity.AttributeFunction)

            });
        }

        public Response<bool> UpdateAttribute(AttributeEditModel model)
        {
            if(model.Abbreviation.Equals(""))
                return new Response<bool>(false, (int)ErrorEnum.Aplied, "Сокращенное название обязательно для заполнения");

            if (model.Name.Equals(""))
                return new Response<bool>(false, (int)ErrorEnum.Aplied, "Наименование обязательно для заполнения");

            var currentEntity = model.Id == null ? new DictionaryAttribute {Id = Guid.NewGuid()} : _dictionaryAttrContext.GetById((Guid)model.Id);

            currentEntity.Abbreviation = model.Abbreviation.ToUpper().Replace(" ", "_");
            currentEntity.AttributeFunction = AttributeFunction.GetFunction(model.AttributeFunction);
            currentEntity.AttributeTypeId = model.AttributeTypeId;
            currentEntity.Name = model.Name;

            var transaction = _dictionaryAttrContext.StartTransaction();
            _dictionaryAttrContext.Upsert(currentEntity);
            transaction.Commit();
        


            return new Response<bool>();
        }

        public Response<AttributeLinkModel> GetAttributeLinkModel(Guid attributeId)
        {
            var attr = _dictionaryAttrContext.GetById(attributeId);
            return new Response<AttributeLinkModel>(new AttributeLinkModel
            {
                Id = attributeId,
                Type = attr.Type,
                Value = MultipleOperationsHelper.ConvertToType(attr.Type, "")
            });
        }

    }

}
