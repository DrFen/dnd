using Microsoft.Practices.Unity;
using System.Web.Http;
using DnD.DAL.Entities.Campaighn;
using DnD.DAL.Entities.Dictonary;
using DnD.DAL.Entities.Users;
using DnD.DAL.Interfaces;
using DnD.DAL.Interfaces.Operations;
using DnD.DAL.Operations.Camaighn;
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

            var resolver = new UnityDependencyResolver(container);
            GlobalConfiguration.Configuration.DependencyResolver = resolver;
            Core.REST.Resolver.DepResolver = resolver;
            Core.REST.Resolver.Container = container;

            // DependencyResolver.SetResolver(resolver);
        }

        private static void RegisterTypes(IUnityContainer container)
        {
            #region Operations
            container.RegisterType<IUserOperations, UserOperations>();
            container.RegisterType<IDictionaryOperations, DictionaryOperations>();
            container.RegisterType<ICampaighnOperations, CampaighnOperations>();
            #endregion

            #region DbModels
            container.RegisterType<IEntityDb<Race>, Race.RaceDb>();
            container.RegisterType<IEntityDb<Subrace>, Subrace.SubRaceDb>();
            container.RegisterType<IEntityDb<ItemType>, ItemType.ItemTypeDb>();
            container.RegisterType<IEntityDb<Campaighn>, Campaighn.CampaihnDb>();


            container.RegisterType<IUserDb<User>, UserDb>();
            #endregion
        }
    }
}