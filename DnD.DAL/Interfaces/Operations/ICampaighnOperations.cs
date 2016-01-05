using System.Collections.Generic;
using DnD.Core.REST;
using DnD.DAL.Models.Campaighn;

namespace DnD.DAL.Interfaces.Operations
{
    public interface ICampaighnOperations
    {
        Response<List<CampaighnListAnswer>> GetList(string userKey);
    }
}
