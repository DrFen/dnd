using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using DnD.DAL.Extensions.Attribute;
using DnD.DAL.Models;

namespace DnD.DAL.Extensions
{
    public static class EnumExtensions
    {

        public static string GetName<T>(string enumValue) where T : struct, IConvertible
        {

            var memInfoNew = typeof(T).GetMember(enumValue);
            if (memInfoNew.Any())
            {
                var attribute = memInfoNew[0].GetCustomAttributes(typeof(EnumNameAttribute), false).FirstOrDefault();
                if (attribute != null)
                {
                    return attribute.GetType().GetProperty("Name").GetValue(attribute).ToString();

                }
            }
            return "";

        }

        public static List<EnumListModel> GetList<T>(this System.Enum thisEnum) where T : struct, IConvertible
        {
            var values = (T[])System.Enum.GetValues(thisEnum.GetType());

            return values.Select(s => new EnumListModel
            {
                Id = Convert.ToInt32(s),
                Name = GetName<T>(s.ToString(CultureInfo.InvariantCulture))
            }).ToList();



        }
    }
}
