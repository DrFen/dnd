using System;
using NHibernate;

namespace DnD.DAL.Repositories.General
{
    public interface IEntityDb<T> where T:class
    {
        IQueryOver<T> GetList();
        T GetById(Guid id);
        void Upsert(T entity);
        void Delete(Guid id);
        void Delete(T entity);
        ITransaction StartTransaction();
        void CommitTransaction(ITransaction transaction);
        void RollbackTransaction(ITransaction transaction);

        ISession GetSession();
        void SetSession(ISession session);
    }
}
