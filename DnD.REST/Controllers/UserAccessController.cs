using System;
using System.Collections.Generic;
using System.Web.Http;
using DnD.Core.REST;
using DnD.DAL.Interfaces.UserAccess;
using DnD.DAL.Models.UserAccess;
using DnD.DAL.Models.UserAccess.List;

namespace DnD.REST.Controllers
{
    [RoutePrefix("api/UserAccess")]
    public class UserAccessController : ApiController
    {
        private readonly IUserOperations _userOperations;

        public UserAccessController(IUserOperations userOperations)
        {
            _userOperations = userOperations;
        }

        [Route("UserList")]
        [HttpPost]
        public Response<List<UserListModel>> TestApi(Request<string> req)
        {

            return new Response<List<UserListModel>>(_userOperations.GetUserList());
        }

        [Route("Login")]
        [HttpPost]
        public Response<string> UserLogin(Request<LoginUserModel> req)
        {
            return _userOperations.Login(req.Value);
        }

       [Route("AddUser")]
        [HttpPost]
        public Response<Guid?> AddUser(Request<LoginUserModel> req)
        {
           return _userOperations.AddUser(req.Value);
        }
    }
}
