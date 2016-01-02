
using System;
using System.Collections.Generic;
using System.Linq;
using DnD.DAL.Entities.Users;
using DnD.DAL.Interfaces.UserAccess;
using DnD.DAL.Models.UserAccess.List;
using DnD.DAL.Repositories.General;
using DnD.DAL.Repositories.UserAccess;

namespace DnD.DAL.Operations.UserAccess
{
    public class UserOperations : IUserOperations
    {
        private readonly  IEntityDb<User>_userContext;

        public UserOperations(IEntityDb<User> userContext)
        {
            _userContext = userContext;
        }

        public virtual  List<UserListModel> GetUserList()
        {
            var dAnswer = _userContext.GetList();
            var answer = dAnswer.Select(s => new UserListModel { Id = s.Id, Name = s.Name, Login = s.Login}).ToList();
            return answer;

        }

        public List<CreateUser> AddUser()
        {
            return null;//_userContext.InsertUser(Guid.NewGuid().ToString(), "new_user");


        }

    }
}
