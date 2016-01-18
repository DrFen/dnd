using System;
using DnD.DAL.Interfaces;
using DnD.DAL.Repositories.General;
using NHibernate.Mapping.Attributes;

namespace DnD.DAL.Entities.Dictonary
{
    [Class(Table = "t_attribute_type", Schema = "attributes")]
    public class DictionaryAttributeType : IComboValue
    {
        [Id(0, Column = "id", Type = "guid", Name = "Id")]
        [Generator(1, Class = "DnD.DAL.Repositories.General.GuidGeneration, DnD.Dal")]
        public virtual Guid Id { get; set; }

        [Property(Column = "name", Type = "String")]
        public virtual string Name { get; set; }

        [Property(Column = "code", Type = "String")]
        public virtual string Code { get; set; }

        [Property(Column = "root_id", Type = "guid")]
        public virtual Guid? RootId { get; set; }

        public class DictionaryAttributeTypeDb : RepositoryHelper<DictionaryAttributeType>
        {

        }
    }
}
