using System.Collections.Generic;
using DnD.Core.REST;
using DnD.DAL.Models.UserAccess.List.Dictionary;

namespace DnD.DAL.Operations.Dictionary
{
    public interface IDictionaryOperations
    {
        Response<List<RaceListModel>> GetRaceList();
    }
}
