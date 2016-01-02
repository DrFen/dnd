using System;
using System.Configuration;
using DnD.Core.Enums;

namespace DnD.Core.REST
{
    public class Response<T>
    {

        public int ErrorCode { get; set; }
        public string ErrorMessage { get; set; }
        public T Value { get; set; }


      public Response(T val, int? errorCode, string errorMessage)
        {
            Value = val;
            ErrorCode = errorCode??(int)ErrorEnum.Ok;
            ErrorMessage = errorMessage;
        }
        public Response(T val) : this(val, null, "") { }
        public Response() : this(default(T), null, "") { }
    }
}
