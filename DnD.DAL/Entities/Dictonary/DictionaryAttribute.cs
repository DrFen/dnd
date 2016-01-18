using System;
using DnD.DAL.Interfaces;
using DnD.DAL.Repositories.General;
using NHibernate.Mapping.Attributes;

namespace DnD.DAL.Entities.Dictonary 
{
    [Class(Table = "t_attribute", Schema = "attributes")]
    public class DictionaryAttribute : IEntity
    {
        [Id(0, Column = "id", Type = "guid", Name = "Id")]
        [Generator(1, Class = "DnD.DAL.Repositories.General.GuidGeneration, DnD.Dal")]
        public virtual Guid Id { get; set; }

        [Property(Column = "name", Type = "String")]
        public virtual string Name { get; set; }

        [Property(Column = "abbreviation", Type = "String")]
        public virtual string Abbreviation { get; set; }

        [Property(Column = "attr_type_id", Type = "guid")]
        public virtual Guid? AttributeTypeId { get; set; }

        [Property(Column = "aggregate_function", Type = "String")]
        public virtual string AttributeFunction { get; set; }

        public class DictionaryAttributeDb: RepositoryHelper<DictionaryAttribute>
        {
             
        }
    }
}
