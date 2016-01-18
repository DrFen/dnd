using System;
using System.Collections.Generic;
using System.Linq;
using DnD.DAL.Models;

namespace DnD.DAL.Enum
{
    public static class AttributeFunction
    {
        public static AttributeParam Sum => new AttributeParam { Key = "sum", Representation = "Сумма", Id = Guid.Parse("00000000-0000-0000-0000-000000000001") };
        public static AttributeParam Max => new AttributeParam { Key = "max", Representation = "Максимум", Id = Guid.Parse("00000000-0000-0000-0000-000000000002") };
        public static AttributeParam SumNotLess0 => new AttributeParam { Key = "sum_not_less_zero", Representation = "Сумма, но не меньше 0", Id = Guid.Parse("00000000-0000-0000-0000-000000000003") };
       

        public static List<AttributeParam> GetData()
        {
            return new List<AttributeParam>
            {
                new AttributeParam {Id = Sum.Id, Representation = Sum.Representation,  Key = Sum.Key},
                new AttributeParam {Id = Max.Id, Representation = Max.Representation, Key = Max.Key},
                new AttributeParam {Id = SumNotLess0.Id, Representation = SumNotLess0.Representation, Key = SumNotLess0.Key}
            };
        }

        public static List<ComboListModel> GetList()
        {
            return GetData().Select(s => new ComboListModel { Id = s.Id, Name = s.Representation}).ToList();

        }

        public static string GetFunction(Guid? id)
        {
            if (id.Equals(null))
                return "";

            return GetData().Single(s => s.Id.Equals(id)).Key;
        }

        public static Guid? GetId(string key)
        {
            if (key == null)
                return null;
            return GetData().Single(s => s.Key.Equals(key)).Id;
        }

        public class AttributeParam
        {
            public Guid Id { get; set; }
            public string Key { get; set; }
            public string Representation { get; set; }
        }
    }
}
