using Domain.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infraestructure.Data
{
    public class DataContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) 
        { 
            if (!optionsBuilder.IsConfigured) 
            { 
                optionsBuilder.UseSqlite("Data Source=C:\\Users\\ericd\\builds-dotnet\\FullStack_Test\\Insurers_API\\Infraestructure\\test_sqlite.db"); 
            } 
        }
        public DataContext () { }
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
                Database.EnsureCreated();
        }

        public DbSet<Insurer> Insurers => Set<Insurer>(); 
    }
}
