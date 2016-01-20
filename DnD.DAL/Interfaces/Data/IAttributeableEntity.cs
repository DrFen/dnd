using System;

namespace DnD.DAL.Interfaces.Data
{
    public interface IAttributeableEntity
    {
        Guid Id { get; set; }
        Guid AttributeGroupId { get; set; }
        Guid OwnerId { get; set; }
    }
}
