
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Reflection;
using DnD.DAL.Interfaces;
using NHibernate;
using NHibernate.Mapping.Attributes;
using NHibernate.Transform;

namespace DnD.DAL.Repositories.General
{
    public class RepositoryHelper<T> : IEntityDb<T> where T : class, IEntity
    {


        private ISession _session;

        protected RepositoryHelper()
        {
            SetSession(ApplicationCore.Instance.SessionFactory.OpenSession());
        }
        public void SetSession(ISession session)
        {
            _session = session;
        }



        public void Upsert(T entity)
        {
            using (var transaction = _session.BeginTransaction())
            {
                _session.Save(entity);
                transaction.Commit();
            }
        }

        public void Delete(Guid id)
        {
            using (var transaction = _session.BeginTransaction())
            {
                var entity = GetById(id);
                _session.Delete(entity);
                transaction.Commit();
            }
        }


        public static Stream Register()
        {
            HbmSerializer.Default.Validate = true;
            var a = (Assembly.GetAssembly(typeof (T)));
            return HbmSerializer.Default.Serialize(a);
        }
        public IQueryOver<T> GetList()
        {
            return _session.QueryOver<T>();

        }

        public T GetById(Guid id)
        {
            return _session.QueryOver<T>().List().First(f => f.Id.Equals(id));

        }

        public List<TOut> ExecuteStoredProcedure<TOut>(string procedureName, List<SqlParameter> parameterList) where TOut : class
        {
            var queryStr = "";
            var paramStr = "";


            foreach (var parameter in parameterList.Where(w => w.Direction.Equals(ParameterDirection.Input)))
            {
                if (!queryStr.Equals(""))
                    queryStr = queryStr + ", ";

                queryStr = queryStr + ":" + parameter.ParameterName;

            }

            foreach (var parameter in parameterList.Where(w => w.Direction.Equals(ParameterDirection.Output)))
            {
                if (!paramStr.Equals(""))
                    paramStr = paramStr + ", ";

                paramStr = paramStr + parameter.ParameterName + " AS " + parameter.SourceColumn;

            }
            var query = _session.CreateSQLQuery("SELECT " + paramStr + " FROM " + procedureName + "(" + queryStr + "); ");
            AddStoredProcedureParameters(query, parameterList);
            using (var transaction = _session.BeginTransaction())
            {
                // var answer = query.UniqueResult();
                var answer = query.SetResultTransformer(Transformers.AliasToBean<TOut>()).List<TOut>().ToList();
                transaction.Commit();
                return answer;
            }
        }

        private void AddStoredProcedureParameters(IQuery query, IEnumerable<SqlParameter> parameterList)
        {
            foreach (var parameter in parameterList.Where(w => w.Direction.Equals(ParameterDirection.Input)))
            {
                query.SetParameter(parameter.ParameterName, parameter.Value);
            }
        }
    }
}
