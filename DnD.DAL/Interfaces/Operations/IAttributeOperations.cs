using System;
using System.Collections.Generic;
using DnD.Core.REST;
using DnD.DAL.Models.Dictionary;
using DnD.DAL.Models.Dictionary.Edit;
using DnD.DAL.Models.Dictionary.List;

namespace DnD.DAL.Interfaces.Operations
{
    public interface IAttributeOperations
    {
        Response<List<AttributeTypeListModel>> GetTypesList();
        Response<List<AttributeListModel>> GetAttributeList(Guid? attributeTypeId);
        Response<AttributeEditModel> GetAttributeEditModel(Guid attributeId);
        Response<bool> UpdateAttribute(AttributeEditModel model);
        Response<List<AttributeLinkModel>> GetAttributeSelectList(Guid? attributeTypeId);
        Response<AttributeLinkModel> GetAttributeLinkModel(Guid attributeId);
    }
}
