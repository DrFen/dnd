using System;
using NHibernate.Engine;
using NHibernate.Id;

namespace DnD.DAL.Repositories.General
{
    public class GuidGeneration : IIdentifierGenerator
    {
        public object Generate(ISessionImplementor session, object obj)
        {
            return Guid.NewGuid();
        }
    }
}