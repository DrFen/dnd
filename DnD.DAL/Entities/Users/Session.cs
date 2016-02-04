using System;
using DnD.DAL.Interfaces;
using DnD.DAL.Repositories.General;
using NHibernate.Mapping.Attributes;

namespace DnD.DAL.Entities.Users
{
   // [Class(Table = "v_sessions", Schema = "user_access")]
    public class Session//: IEntity
    {
       /* public Guid Id { get; set; }

        [Property(Column = "sess_key", Type = "String")]
        public string Key { get; set; }
        [Property(Column = "user_id", Type = "guid")]
        public Guid UserId { get; set; }

        public class SessionDb : RepositoryHelper<Session>
        {
            public override void Upsert(Session entity)
            {
                throw new Exception("Недоступно");
            }
        }*/
    }
}
