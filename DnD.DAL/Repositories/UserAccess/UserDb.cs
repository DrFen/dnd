using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using DnD.DAL.Entities.Users;
using DnD.DAL.Repositories.General;


namespace DnD.DAL.Repositories.UserAccess
{
    public class UserDb : RepositoryHelper<User>
    {
        public List<CreateUser> InsertUser(string login, string password)
        {
            var parameters = new List<SqlParameter>();
            parameters.Add(new SqlParameter
            {
                ParameterName = "pi_login",
                Direction = ParameterDirection.Input,
                Value = login,
                TypeName = "text"
            });

            parameters.Add(new SqlParameter
            {
                ParameterName = "pi_password",
                Direction = ParameterDirection.Input,
                Value = password,
                TypeName = "text"
            });

            parameters.Add(new SqlParameter
            {
                ParameterName = "po_user_id",
                Direction = ParameterDirection.Output,
                DbType = DbType.Guid,
                SourceColumn = "Id"
            });

            parameters.Add(new SqlParameter
            {
                ParameterName = "po_err_msg",
                Direction = ParameterDirection.Output,
                DbType = DbType.String,
                SourceColumn = "ErrorMessage"

            });

            parameters.Add(new SqlParameter
            {
                ParameterName = "po_result",
                Direction = ParameterDirection.Output,
                DbType = DbType.Int16,
                SourceColumn = "Result"

            });

            return ExecuteStoredProcedure<CreateUser>("user_access.add_user", parameters);
        }

    }
}
