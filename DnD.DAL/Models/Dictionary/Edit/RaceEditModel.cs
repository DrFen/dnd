using System;
using System.Collections.Generic;

namespace DnD.DAL.Models.Dictionary.Edit
{
    public class RaceEditModel
    {
        public Guid? Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public List<AttributeLinkListModel> Attributes { get; set; }
    }
}
