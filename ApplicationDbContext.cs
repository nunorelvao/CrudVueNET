using CrudVueNET.Models;
using Microsoft.EntityFrameworkCore;

namespace CrudVueNET
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        { }

        public DbSet<Record> Records { get; set; }
    }
}