using System;
using DnD.DAL.Interfaces;
using DnD.DAL.Repositories.General;
using NHibernate.Mapping.Attributes;

namespace DnD.DAL.Entities.Dictonary.Attributes
{
    [Class(Table = "t_attribute_group_data", Schema = "attributes")]
    public class AttributeGroupData: IEntity
    {
        [Id(0, Column = "id", Type = "guid", Name = "Id")]
        [Generator(1, Class = "DnD.DAL.Repositories.General.GuidGeneration, DnD.Dal")]
        public virtual Guid Id { get; set; }

        [Property(Column = "attribute_group_id", Type = "guid")]
        public virtual Guid AttributeGroupId { get; set; }


        [Property(Column = "attribute_id", Type = "guid")]
        public virtual Guid AttributeId { get; set; }

        [Property(Column = "value", Type = "String")]
        public virtual string Value { get; set; }
        
        public class AttributeGroupDataDb : RepositoryHelper<AttributeGroupData>
        {

        }
    }
}
