﻿
using DnD.DAL.Entities.Users;
using NHibernate.Cfg;

namespace DnD.DAL.Repositories.General
{
    public class DbContext
    {
        public static void InitializeContext()
        {
            Configuration configuration = new Configuration();

            configuration.AddInputStream(RepositoryHelper<User>.Register());
            configuration.Configure();
            ApplicationCore.Instance.SessionFactory = configuration.BuildSessionFactory();
        }
    }
}
