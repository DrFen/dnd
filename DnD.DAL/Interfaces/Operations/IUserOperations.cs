using System;
using System.Collections.Generic;
using DnD.Core.REST;
using DnD.DAL.Models.UserAccess;
using DnD.DAL.Models.UserAccess.List;

namespace DnD.DAL.Interfaces.Operations
{
    public interface IUserOperations
    {
        List<UserListModel> GetUserList();
        

        Response<string> Login(LoginUserModel userModel);
        Response<Guid?> AddUser(LoginUserModel userModel);

    }
}
