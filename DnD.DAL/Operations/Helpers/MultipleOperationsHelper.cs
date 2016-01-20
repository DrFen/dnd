using System;
using System.Collections.Generic;
using System.Linq;
using DnD.Core.REST;
using DnD.DAL.Entities.Dictonary.Attributes;
using DnD.DAL.Interfaces.Data;
using DnD.DAL.Models.Dictionary;
using DnD.DAL.Repositories.General;
using Newtonsoft.Json;

namespace DnD.DAL.Operations.Helpers
{
    public static class MultipleOperationsHelper
    {
        public static void SaveAttributes<T>(this List<AttributeLinkListModel> attributeModel,
                                               Guid ownerId,
                                               IEntityDb<T> ownerContext) where T : class, IAttributeableEntity
        {
            var contextAttributeGroup = (IEntityDb<AttributeGroup>)Resolver.Resolve<IEntityDb<AttributeGroup>>();
            var contextAttributeGroupData =
                (IEntityDb<AttributeGroupData>)Resolver.Resolve<IEntityDb<AttributeGroupData>>();

            contextAttributeGroup.SetSession(ownerContext.GetSession());
            contextAttributeGroupData.SetSession(ownerContext.GetSession());


            var deletedLinks =
                ownerContext.GetList()
                    .List()
                    .Where(
                        w =>
                            w.OwnerId.Equals(ownerId) &&
                            !attributeModel.Where(ww => !ww.Id.Equals(null))
                                .Select(ss => ss.Id)
                                .Contains(w.AttributeGroupId));

            var dataAttrIds = contextAttributeGroupData.GetList().List()
                .Where(ww => attributeModel.Where(w => !w.Id.Equals(null)).Select(s => s.Id).Contains(ww.AttributeGroupId))
                .Select(ss => new {ss.AttributeGroupId, ss.AttributeId, ss.Id}).ToList();

            foreach (var deletedLink in deletedLinks)
            {
                ownerContext.Delete(deletedLink);
            }

            foreach (var attributeElement in attributeModel)
            {
                var groupId = attributeElement.Id ?? Guid.NewGuid();

                if (attributeElement.Id.Equals(null))
                {
                    contextAttributeGroup.Upsert(new AttributeGroup
                    {
                        Id = groupId,
                        AllowSelectCount = attributeElement.Count
                    });

                    var constructor = typeof(T).GetConstructor(Type.EmptyTypes);
                    if (constructor == null)
                        throw new Exception("Не найден конструктор");

                    var newLink = (IAttributeableEntity)constructor.Invoke(new object[] { });
                    newLink.OwnerId = ownerId;
                    newLink.AttributeGroupId = groupId;
                    newLink.Id = Guid.NewGuid();
                    ownerContext.Upsert((T)newLink);
                }
                else
                {
                    var deletingListGroupData =
                        contextAttributeGroupData.GetList()
                            .List()
                            .Where(
                                w =>
                                    w.AttributeGroupId.Equals(groupId) &&
                                    !attributeElement.Attributes.Select(s => s.Id).Contains(w.AttributeId)).ToList();
                    foreach (var deletedElement in deletingListGroupData)
                    {
                        contextAttributeGroupData.Delete(deletedElement);
                    }
                }

                var upsertElementGroupData =
                    attributeElement.Attributes.Select(
                        s =>
                            new AttributeGroupData
                            {
                                Id =
                                    dataAttrIds.FirstOrDefault(
                                        f => f.AttributeGroupId.Equals(groupId) && f.AttributeId.Equals(s.Id))?.Id ??
                                    Guid.NewGuid(),
                                AttributeId = s.Id,
                                AttributeGroupId = groupId,
                                Value = s.Value?.ToString() ?? ""
                            });

                foreach (var upsertElement in upsertElementGroupData)
                {
                    contextAttributeGroupData.Upsert(upsertElement);
                }


            }


        }

        public static List<AttributeLinkListModel> GetAttributes<T>(this IEntityDb<T> ownerContext,
                                                                          Guid ownerId) where T : class, IAttributeableEntity
        {
            var contextAttributeGroup = (IEntityDb<AttributeGroup>)Resolver.Resolve<IEntityDb<AttributeGroup>>();
            var contextAttributeGroupData =
                (IEntityDb<AttributeGroupData>)Resolver.Resolve<IEntityDb<AttributeGroupData>>();
            var contextAttribute =
                (IEntityDb<DictionaryAttribute>)Resolver.Resolve<IEntityDb<DictionaryAttribute>>();

            contextAttributeGroup.SetSession(ownerContext.GetSession());
            contextAttributeGroupData.SetSession(ownerContext.GetSession());
            contextAttribute.SetSession(ownerContext.GetSession());


            var attrGroupQuery = contextAttributeGroup.GetList().List().Where(ww => ownerContext.GetList()
                .List()
                .Where(w => w.OwnerId.Equals(ownerId))
                .Select(s => s.AttributeGroupId).Contains(ww.Id));


            var groupData =
                contextAttributeGroupData.GetList().List()
                .Join(contextAttribute.GetList().List(),
                agd => agd.AttributeId,
                att => att.Id,
                (agd, att) => new { Group = agd, Atr = att })
                 .Where(w => attrGroupQuery.Select(s => s.Id).Contains(w.Group.AttributeGroupId))
                 .ToList();


            var attrGroup = attrGroupQuery.ToList();

            var answer = attrGroup.Select(s => new AttributeLinkListModel
            {
                Id = s.Id,
                Count = s.AllowSelectCount

            }).ToList();

            foreach (var elem in answer)
            {
                elem.Attributes =
                    groupData.Where(w => w.Group.AttributeGroupId.Equals(elem.Id))
                        .Select(s => new AttributeLinkModel
                        {
                            Id = s.Group.AttributeId,
                            Value = ConvertToType(s.Atr.Type, s.Group.Value),
                            Label = s.Atr.Name,
                            Type = s.Atr.Type,
                            AllowSelectCount = null,
                            ListValues = null,
                            ListApi = null,
                            ListApiParams = null
                        })
                        .ToList();
            }

            return answer;
        }

        public static object ConvertToType(string type, string value)
        {
            switch (type)
            {
                case "number":
                    if (value.Equals(""))
                        return 0;
                    return Convert.ToDouble(value);
                case "bool":
                    if (value.Equals(""))
                        return false;
                    return Convert.ToBoolean(value);
                case "combo":
                    if (value.Equals(""))
                        return new object[] { };
                    return JsonConvert.DeserializeObject(value);
                case "multiselect":
                    if (value.Equals(""))
                        return new object[] { };
                    return JsonConvert.DeserializeObject(value);
                default:
                    return value;
            }
        }
    }
}
