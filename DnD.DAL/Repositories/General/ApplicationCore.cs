using NHibernate;

namespace DnD.DAL.Repositories.General
{
    public sealed class ApplicationCore
    {
        private static ISessionFactory _mIsessionFactory;

        public static ApplicationCore Instance { get; } = new ApplicationCore();

        public ISessionFactory SessionFactory
        {
            get { return _mIsessionFactory; }
            set { _mIsessionFactory = value; }
        }
    }
}