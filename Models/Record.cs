using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CrudVueNET.Models
{
    public class Record
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double Value { get; set; }
        public DateTime? Date { get; set; }
        public string Time { get; set; }
    }
}
