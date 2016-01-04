using System.Collections.Generic;
using System.Linq;
using DnD.Core.REST;
using DnD.DAL.Interfaces;
using DnD.DAL.Models;
using DnD.DAL.Repositories.General;


namespace DnD.DAL.Operations.Helpers
{
    public class ComboValuesGetter<T> where T : class, IComboValue
    {
        
        
        public static List<ComboListModel> GetCombo()
        {

            var context = (IEntityDb<T>)Resolver.Resolve<IEntityDb<T>>();
            if (context==null)
                return new List<ComboListModel>();

            return context.GetList()
                .List()
                .OrderBy(o => o.Name)
                .Select(s => new ComboListModel {Id = s.Id, Name = s.Name})
                .ToList();
        }
    }
}
