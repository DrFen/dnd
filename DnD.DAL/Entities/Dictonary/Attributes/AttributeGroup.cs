using System;
using DnD.DAL.Interfaces;
using DnD.DAL.Repositories.General;
using NHibernate.Mapping.Attributes;

namespace DnD.DAL.Entities.Dictonary.Attributes
{
    [Class(Table = "t_attribute_group", Schema = "attributes")]
    public class AttributeGroup:IEntity
    {
        [Id(0, Column = "id", Type = "guid", Name = "Id")]
        [Generator(1, Class = "DnD.DAL.Repositories.General.GuidGeneration, DnD.Dal")]
        public virtual Guid Id { get; set; }

        [Property(Column = "allow_count_select", TypeType = typeof(int))]
        public virtual int? AllowSelectCount { get; set; }

        public class AttributeGroupDb:RepositoryHelper<AttributeGroup>
        {
            
        }
        
    }
}
