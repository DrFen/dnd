using System;
using NHibernate.Collection.Generic;
using System.Collections.Generic;

namespace DnD.DAL.Models.Dictionary
{
    public class AttributeLinkListModel
    {
        public Guid? Id { get; set; }
        public int? Count { get; set; } 
        public List<AttributeLinkModel> Attributes { get; set; }

        
    }

    public class AttributeLinkModel
    {
        public Guid Id { get; set; }
        public string Type { get; set; }
        public string Label { get; set; }


        public List<ComboListModel> ListValues { get; set; }
        public string ListApi { get; set; }
        public object ListApiParams { get; set; }
        public int? AllowSelectCount { get; set; }


        public object Value { get; set; }
    }

}
