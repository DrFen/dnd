using System;
using System.Collections.Generic;
using DnD.Core.REST;
using DnD.DAL.Models.Dictionary;

namespace DnD.DAL.Interfaces.Dictionary
{
    public interface IDictionaryOperations
    {
        #region race
        Response<List<RaceListModel>> GetRaceList();
        Response<bool> UpdateRace(RaceListModel updateModel);
        Response<bool> DeleteRace(Guid id);
        #endregion

        #region subrace
        Response<List<SubraceListModel>> GetSubraceList();
        Response<bool> UpdateSubrace(SubraceListModel updateModel);
        Response<bool> DeleteSubrace(Guid id);
        #endregion
    }
}
