using System;
using DnD.DAL.Entities.Dictonary.Attributes;
using DnD.DAL.Interfaces;
using DnD.DAL.Interfaces.Data;
using DnD.DAL.Repositories.General;
using NHibernate.Mapping.Attributes;

namespace DnD.DAL.Entities.Dictonary.CharacterDictionary
{
    [Class(Table = "t_race_attribute", Schema = "character_dict")]
    public class RaceAttribute : IAttributeableEntity, IEntity
    {
        [Id(0, Column = "id", Type = "guid", Name = "Id")]
        [Generator(1, Class = "DnD.DAL.Repositories.General.GuidGeneration, DnD.Dal")]
        public virtual Guid Id { get; set; }

        [Property(Column = "attribute_group_id", Type = "guid")]
        public virtual Guid AttributeGroupId { get; set; }

        [Property(Column = "race_id", Type = "guid")]
        public virtual Guid OwnerId { get; set; }

        public class RaceAttributeDb : RepositoryHelper<RaceAttribute>
        {

        }
    }
}
