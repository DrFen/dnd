using System.Collections.Generic;

namespace DnD.DAL.Repositories.General
{
    public interface IRepository<T>
    {
        void Save(T entity);
        List<T> GetList();
    }
}
