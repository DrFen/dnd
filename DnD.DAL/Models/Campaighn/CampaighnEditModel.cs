using System;
using System.Collections.Generic;

namespace DnD.DAL.Models.Campaighn
{
    public class CampaighnEditModel
    {
        public Guid? Id { get; set; }
        public string Name { get; set; }
        public int? StartLevel { get; set; }
        public List<Guid> Subraces { get; set; }
    }
}
