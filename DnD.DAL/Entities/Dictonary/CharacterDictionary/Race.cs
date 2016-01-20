using System;
using DnD.DAL.Interfaces;
using DnD.DAL.Repositories.General;
using NHibernate.Mapping.Attributes;

namespace DnD.DAL.Entities.Dictonary.CharacterDictionary
{
    [Class(Table = "t_race", Schema = "character_dict")]
    public class Race : IComboValue
    {
        [Id(0, Column = "id", Type = "guid", Name = "Id")]
        [Generator(1, Class = "DnD.DAL.Repositories.General.GuidGeneration, DnD.Dal")]
        public virtual Guid Id { get; set; }

        [Property(Column = "name", Type = "String")]
        public virtual string Name { get; set; }

        [Property(Column = "description", Type = "String")]
        public virtual string Description { get; set; }

        /*private IList<Subrace> _subraces;

        [Bag(0, Name = "Subraces")]
        [Key(1, Column = "id")]
        [OneToMany(2, ClassType = typeof(Subrace))]
        public virtual IList<Subrace> Subraces
        {
            get { return _subraces ?? (_subraces = new List<Subrace>()); }
            set { _subraces = value; }
        }*/

        public class RaceDb : RepositoryHelper<Race>
        {
        }
    }
}
