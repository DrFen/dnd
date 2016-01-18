using DnD.DAL.Entities.Users;
using DnD.DAL.Repositories.General;

namespace DnD.DAL.Interfaces
{
    public interface IUserDb<T> : IEntityDb<T> where T : class, IEntity
    {
        LoginUser LoginUser(string login, string password);
        CreateUser AddUser(string login, string password);
    }
}

