using System.Web;
using System.Web.Http;
using DnD.DAL.Repositories.General;

namespace DnD.REST
{
    public class WebApiApplication : HttpApplication
    {
        protected void Application_Start()
        {
            DbContext.InitializeContext();
            UnityConfig.RegisterComponents();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            
        }
    }
}
