using System;
using System.Collections.Generic;

namespace DnD.DAL.Models.Dictionary.List
{
    public class AttributeTypeListModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Guid? RootId { get; set; }
        public List<AttributeTypeListModel> Nodes { get; set; } 
    }
}
