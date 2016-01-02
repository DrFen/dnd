using Microsoft.Practices.Unity;
using System.Web.Http;
using DnD.DAL.Entities.Dictonary;
using DnD.DAL.Entities.Users;
using DnD.DAL.Interfaces.UserAccess;
using DnD.DAL.Operations.Dictionary;
using DnD.DAL.Operations.UserAccess;
using DnD.DAL.Repositories.General;
using DnD.DAL.Repositories.UserAccess;
using Unity.WebApi;

namespace DnD.REST
{
    public static class UnityConfig
    {
        public static void RegisterComponents()
        {
            var container = new UnityContainer();

            RegisterTypes(container);

            GlobalConfiguration.Configuration.DependencyResolver = new UnityDependencyResolver(container);
        }

        private static void RegisterTypes(IUnityContainer container)
        {
            #region Operations
            container.RegisterType<IUserOperations, UserOperations>();
            container.RegisterType<IDictionaryOperations, DictionaryOperations>();
            #endregion

            #region DbModels
            container.RegisterType<IEntityDb<Race>, Race.RaceDb>();

            container.RegisterInstance(typeof(UserDb));
            container.RegisterType<IUserDb<User>, UserDb>();
            #endregion
        }
    }
}