using System;
using System.Collections.Generic;
using System.Web.Http;
using DnD.Core.REST;
using DnD.DAL.Interfaces.Operations;
using DnD.DAL.Models.Dictionary;
using DnD.DAL.Models.Dictionary.Edit;
using DnD.DAL.Models.Dictionary.List;

namespace DnD.REST.Controllers
{
    [RoutePrefix("api/Attribute")]
    public class AttributeController : ApiController
    {
        private readonly IAttributeOperations _attributeOperation;

        public AttributeController(IAttributeOperations attributeOperation)
        {
            _attributeOperation = attributeOperation;
        }

        [Route("TypeList")]
        public Response<List<AttributeTypeListModel>> TypesList(Request<bool> req)
        {
            return _attributeOperation.GetTypesList();
        }

        [Route("List")]
        public Response<List<AttributeListModel>> AttributeList(Request<Guid?> req)
        {
            return _attributeOperation.GetAttributeList(req.Value);
        }

        [Route("SelectList")]
        public Response<List<AttributeLinkModel>> AttributeSelectList(Request<Guid?> req)
        {
            return _attributeOperation.GetAttributeSelectList(req.Value);
        }

        [HttpPost]
        [Route("EditModel")]
        public Response<AttributeEditModel> GetAttributeEditModel(Request<Guid> req)
        {
            return _attributeOperation.GetAttributeEditModel(req.Value);
        }

        [HttpPost]
        [Route("UpdateAttribute")]
        public Response<bool> UpdateAttribute(Request<AttributeEditModel> req)
        {
            return _attributeOperation.UpdateAttribute(req.Value);
        }

        [HttpPost]
        [Route("AttributeParam")]
        public Response<AttributeLinkModel> GetAttributeParam(Request<Guid> req)
        {
            return _attributeOperation.GetAttributeLinkModel(req.Value);
        }
    }
}
