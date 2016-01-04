using Microsoft.Practices.Unity;
using Unity.WebApi;

namespace DnD.Core.REST
{
    public static class Resolver
    {
        public static UnityContainer Container { get; set; }
        public static UnityDependencyResolver DepResolver { get; set; }

        public static object Resolve<T>()
        {
            return DepResolver.GetService(typeof(T));
        }
    
}
}
