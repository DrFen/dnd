using System;
using DnD.DAL.Interfaces;
using DnD.DAL.Repositories.General;
using NHibernate.Mapping.Attributes;

namespace DnD.DAL.Entities.Dictonary
{
    [Class(Table = "t_subrace", Schema = "character_dict")]
    public class Subrace : IComboValue
    {
        [Id(0, Column = "id", Type = "guid", Name = "Id")]
        [Generator(1, Class = "DnD.DAL.Repositories.General.GuidGeneration, DnD.Dal")]
        public virtual Guid Id { get; set; }

        [Property(Column = "name", Type = "String")]
        public virtual string Name { get; set; }

        [Property(Column = "description", Type = "String")]
        public virtual string Description { get; set; }

        [Property(Column = "race_id", Type = "guid")]
        public virtual Guid RaceId { get; set; }


       
      /* [ManyToOne(Name = "Race", ClassType = typeof(Race), Column = "race_id")]
        public virtual Race Race { get; set; }*/

        public class SubRaceDb : RepositoryHelper<Subrace>
        {
        }
    }
}
