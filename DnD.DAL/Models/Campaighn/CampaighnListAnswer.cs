using System;
using NHibernate.Mapping.Attributes;

namespace DnD.DAL.Models.Campaighn
{
    public class CampaighnListAnswer
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public int StartLevel { get; set; }
    }
}
