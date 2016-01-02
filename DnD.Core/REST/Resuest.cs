namespace DnD.Core.REST
{
    public class Request<T>
    {
        public string UserKey { get; set; }
        public T Value { get; set; }
    }
}
