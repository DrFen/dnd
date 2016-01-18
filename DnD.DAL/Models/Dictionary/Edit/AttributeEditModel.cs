using System;
using NHibernate.Mapping.Attributes;

namespace DnD.DAL.Models.Dictionary.Edit
{
    public class AttributeEditModel
    {
        public Guid? Id { get; set; }
        public string Name { get; set; }
        public string Abbreviation { get; set; }
        public Guid? AttributeTypeId { get; set; }
        public Guid? AttributeFunction { get; set; }
    }
}
