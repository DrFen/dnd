﻿
using System;
using NHibernate.Mapping.Attributes;

namespace DnD.DAL.Entities.Users
{
    public class CreateUser
    {

        public Guid id { get; set; }

        public int result { get; set; }

        public string errormessage { get; set; }

       
    }
}
