using System;
using DnD.DAL.Interfaces;
using NHibernate.Engine;
using NHibernate.Id;

namespace DnD.DAL.Repositories.General
{
    public class GuidGeneration : IIdentifierGenerator
    {
        public object Generate(ISessionImplementor session, object obj)
        {
            if (((IEntity) obj).Id != null && ((IEntity)obj).Id != Guid.Empty)
                return ((IEntity) obj).Id;

            return Guid.NewGuid();
        }
    }
}