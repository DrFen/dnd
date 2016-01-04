using System;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;

namespace DnD.REST
{
    public class AuthHandler : DelegatingHandler
    {


#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously

        {
            var res = base.SendAsync(request, cancellationToken).Result;
            res.Headers.Add("Cache-Control", "no-cache");
            res.Headers.Add("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
            res.Headers.Add("Access-Control-Allow-Origin", "*");
            res.Headers.Add("Access-Control-Allow-Headers", "Content-Type, Accept, UserKey");
            res.Headers.Add("Access-Control-Max-Age", "1728000");
            res.StatusCode = HttpStatusCode.OK;

            if (request.RequestUri.AbsolutePath.ToLower().EndsWith("useraccess/login"))
                return res;

            if (request.Method.Method != "OPTIONS" )
            {

                var userKeys = request.Headers.SingleOrDefault(s => s.Key.Equals("UserKey")).Value;
                if (userKeys == null)
                    res.StatusCode = HttpStatusCode.Forbidden;
                else
                {
                    if (userKeys.First().Equals("null"))
                        res.StatusCode = HttpStatusCode.Forbidden;
                }

            };

            

            return res;
        }
    }
}
