using System;
using System.Collections.Generic;

namespace DnD.DAL.Models.Dictionary.List
{
    public class ItemTypeListModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Plural { get; set; }
        public Guid? RootId { get; set; }
        public List<ItemTypeListModel> Nodes { get; set; }
    }
}
