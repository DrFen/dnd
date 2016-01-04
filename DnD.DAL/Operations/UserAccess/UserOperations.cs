using System;
using System.Collections.Generic;
using System.Linq;
using DnD.Core.Enums;
using DnD.Core.REST;
using DnD.DAL.Entities.Users;
using DnD.DAL.Interfaces;
using DnD.DAL.Interfaces.UserAccess;
using DnD.DAL.Models.UserAccess;
using DnD.DAL.Models.UserAccess.List;

namespace DnD.DAL.Operations.UserAccess
{
    public class UserOperations : IUserOperations
    {
        private readonly IUserDb<User> _userContext;

        public UserOperations(IUserDb<User> userContext)
        {
            _userContext = userContext;
        }

        public virtual List<UserListModel> GetUserList()
        {
            var dAnswer = _userContext.GetList();
            var answer = dAnswer.List().Select(s => new UserListModel
            {
                Id = s.Id,
                Name = s.Name,
                Login = s.Login
            }).ToList();
            return answer;

        }



        public Response<Guid?> AddUser(LoginUserModel userModel)
        {
            if (userModel == null)
                return new Response<Guid?>
                {
                    Value = null,
                    ErrorCode = (int)ErrorEnum.Aplied,
                    ErrorMessage = "Пустой запрос"
                };

            var createResult = _userContext.AddUser(userModel.Login, userModel.Password);
            return new Response<Guid?>
            {
                Value = createResult.id,
                ErrorCode = createResult.result == 1 ? (int)ErrorEnum.Ok : (int)ErrorEnum.Aplied,
                ErrorMessage = createResult.errormessage
            };

        }

        public Response<string> Login(LoginUserModel userModel)
        {
            if (userModel == null)
                return new Response<string>
                {
                    Value = null,
                    ErrorCode = (int)ErrorEnum.Aplied,
                    ErrorMessage = "Пустой запрос"
                };

            var createResult = _userContext.LoginUser(userModel.Login, userModel.Password);
            return new Response<string>
            {
                Value = createResult.key,
                ErrorCode = createResult.result == 1 ? (int)ErrorEnum.Ok : (int)ErrorEnum.Aplied,
                ErrorMessage = createResult.errormessage
            };

        }
    }
}
