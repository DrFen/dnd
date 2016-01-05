using System;
using DnD.DAL.Interfaces;
using DnD.DAL.Repositories.General;
using NHibernate.Mapping.Attributes;

namespace DnD.DAL.Entities.Campaighn
{
    [Class(Table = "t_campaighn", Schema = "campaighn")]
    public class Campaighn : IComboValue
    {
        [Id(0, Column = "id", Type = "guid", Name = "Id")]
        [Generator(1, Class = "DnD.DAL.Repositories.General.GuidGeneration, DnD.Dal")]
        public virtual Guid Id { get; set; }

        [Property(Column = "name", Type = "String")]
        public virtual string Name { get; set; }

        [Property(Column = "owner", Type = "guid")]
        public virtual Guid OwnerId { get; set; }

        [Property(Column = "start_level", TypeType = typeof(int))]
        public virtual int StartLevel { get; set; }

        public class CampaihnDb: RepositoryHelper<Campaighn>
        {
             
        }

    }
}
