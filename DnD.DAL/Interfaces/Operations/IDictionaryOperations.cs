using System;
using System.Collections.Generic;
using DnD.Core.REST;
using DnD.DAL.Models;
using DnD.DAL.Models.Dictionary.Edit;
using DnD.DAL.Models.Dictionary.List;

namespace DnD.DAL.Interfaces.Operations
{
    public interface IDictionaryOperations
    {
        #region race
        Response<List<RaceListModel>> GetRaceList();
        Response<bool> UpdateRace(RaceEditModel updateModel);
        Response<bool> DeleteRace(Guid id);
        Response<RaceEditModel> GetRaceDetail(Guid id);
        #endregion

        #region subrace
        Response<List<SubraceListModel>> GetSubraceList();
        Response<bool> UpdateSubrace(SubraceListModel updateModel);
        Response<bool> DeleteSubrace(Guid id);
        Response<List<ComboListModel>> GetSubraceCombo();
        #endregion

        #region ItemType

        Response<List<ItemTypeListModel>> ItemTypeList();
        Response<bool> UpdateItemType(ItemTypeEditModel updateModel);
        Response<bool> DeleteItemType(Guid id);

        #endregion
    }
}
