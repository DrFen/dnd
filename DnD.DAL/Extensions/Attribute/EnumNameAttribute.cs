using System;

namespace DnD.DAL.Extensions.Attribute
{
    [AttributeUsage(AttributeTargets.All)]
    public class EnumNameAttribute : System.Attribute
    {
        public string Name { get; set; }

    }
}
