using System.Collections.Generic;
using DnD.DAL.Models.UserAccess.List;

namespace DnD.DAL.Interfaces.UserAccess
{
    public interface IUserOperations
    {
        List<UserListModel> GetUserList();

    }
}
