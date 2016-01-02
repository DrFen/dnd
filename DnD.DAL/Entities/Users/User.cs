using System;
using System.Reflection;
using DnD.DAL.Interfaces;
using NHibernate.Mapping.Attributes;
using NHibernate.Mapping.ByCode.Conformist;
using NHibernate.Type;

namespace DnD.DAL.Entities.Users
{

    [Class(Table = "t_user", Schema = "user_access")]
    public class User : IEntity
    {
        [Id(0, Column = "id", Type = "guid", Name = "Id")]
        [Generator(1, Class = "native")]
        public virtual Guid Id { get; set; }

        [Property(Column = "login", Type = "String")]
        public virtual string Name { get; set; }

        [Property(Column = "login", Type = "String")]
        public virtual string Login { get; set; }



    }

    
   
}
