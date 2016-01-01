
using System;
using NHibernate.Mapping.Attributes;

namespace DnD.DAL.Entities.Users
{
    public class CreateUser
    {

       // [Property(Column = "id", Type = "guid")]
        public Guid id { get; set; }

      //  [Property(Column = "Result", Type = "int")]
        public int result { get; set; }

//        [Property(Column = "ErrorMessage", Type = "String")]
        public string errormessage { get; set; }

       
    }
}
