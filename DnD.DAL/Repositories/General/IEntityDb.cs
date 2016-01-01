using System.Collections.Generic;

namespace DnD.DAL.Repositories.General
{
    public interface IEntityDb<T> where T:class
    {
        List<T> GetList();
    }
}
