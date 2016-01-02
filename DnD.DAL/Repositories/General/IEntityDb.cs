using System.Collections.Generic;
using NHibernate;

namespace DnD.DAL.Repositories.General
{
    public interface IEntityDb<T> where T:class
    {
        IQueryOver<T> GetList();
    }
}
