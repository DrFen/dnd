using System;
using DnD.DAL.Repositories.General;
using NHibernate.Mapping.Attributes;

namespace DnD.DAL.Entities.Campaighn
{
    [Class(Table = "t_campaighn_race", Schema = "campaighn")]
    public class CampaighnRace
    {

        [CompositeId(1)]
        [KeyProperty(2, Name = "CampaighnId", Column = "campaighn_id")]
        [KeyProperty(3, Name = "SubraceId", Column = "subrace_id")]
        [Column(Name = "campaighn_id")]
        public virtual Guid CampaighnId { get; set; }

        //[Property(Column = "subrace_id", Type = "guid")]
        [Column(Name = "subrace_id")]
        public virtual Guid SubraceId { get; set; }

        public override bool Equals(object obj)
        {
            var other = obj as CampaighnRace;

            if (ReferenceEquals(null, other)) return false;
            if (ReferenceEquals(this, other)) return true;

            return CampaighnId == other.CampaighnId && SubraceId == other.SubraceId;
        }

        public override int GetHashCode()
        {
            unchecked
            {
                int hash = GetType().GetHashCode();
                hash = (hash * 31) ^ SubraceId.GetHashCode();
                hash = (hash * 31) ^ CampaighnId.GetHashCode();

                return hash;
            }
        }

        public class CampaighnRaceDb : RepositoryHelper<CampaighnRace>
        {

        }
    }
}
