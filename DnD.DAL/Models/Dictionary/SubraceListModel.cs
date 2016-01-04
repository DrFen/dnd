
using System;

namespace DnD.DAL.Models.Dictionary
{
    public class SubraceListModel
    {
        public Guid? Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public Guid RaceId { get; set; }
        public string RaceName { get; set; }
    }
}
