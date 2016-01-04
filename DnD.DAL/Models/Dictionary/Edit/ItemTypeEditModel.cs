
using System;

namespace DnD.DAL.Models.Dictionary.Edit
{
    public class ItemTypeEditModel
    {
        public Guid? Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Plural { get; set; }
        public Guid? RootId { get; set; }
    }
}
