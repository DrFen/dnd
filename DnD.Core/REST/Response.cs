using System;
using System.Configuration;

namespace DnD.Core.REST
{
    public class Response<T>
    {

        public int? ErrorCode { get; set; }
        public string ErrorMessage { get; set; }
        public T Value { get; set; }


      public Response(T val, int errorCode, string errorMessage)
        {
            Value = val;
            ErrorCode = errorCode;
            ErrorMessage = errorMessage;
        }
        public Response(T val) : this(val, 0, null) { }
        public Response() : this(default(T), 0, null) { }
    }
}
