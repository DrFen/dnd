using System;
using System.Collections.Generic;
using NHibernate;

namespace DnD.DAL.Repositories.General
{
    public interface IEntityDb<T> where T:class
    {
        IQueryOver<T> GetList();
        T GetById(Guid id);
        void Upsert(T entity);
        void Delete(Guid id);
    }
}
