using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using DnD.Core.REST;
using DnD.DAL.Entities.Users;
using DnD.DAL.Interfaces.UserAccess;
using DnD.DAL.Models.UserAccess.List;
using DnD.DAL.Operations.UserAccess;

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

        [Route("TestApi")]
        [HttpPost]
        public Response<List<UserListModel>> TestApi(Request<string> req)
        {

            return new Response<List<UserListModel>>(_userOperations.GetUserList(), 0, "без ошибок");
        }

      /*  [Route("AddUser")]
        [HttpPost]
        public Response<List<CreateUser>> AddUser(Request<string> req)
        {
            //var userInfo = (UserInfo)Request.Properties["userInfo"];

            //var result = _appealOperations.GetComplainer(req.Req, userInfo.User);
            var operation = new UserOperations();
            return new Response<List<CreateUser>>(operation.AddUser(), 0, "без ошибок");
        }*/
    }
}
