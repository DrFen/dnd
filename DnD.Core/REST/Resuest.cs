using System.Drawing.Printing;
using System.Linq;
using System.Net.Http;

namespace DnD.Core.REST
{
    public class Request<T>
    {
        public T Value { get; set; }

        public string GetUserKey(HttpRequestMessage request)
        {
            return ""; //request.Headers.SingleOrDefault(s => s.Key.Equals("UserKey")).Value.FirstOrDefault();
        }
    }
}
