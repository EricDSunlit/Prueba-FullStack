using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class Insurer
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(45)]
        public string Name { get; set; } =  string.Empty;

        [Required]
        [Range(0.00,25.00)]
        public double Commission { get; set; } = 0.00;

        [Required]
        public bool State { get; set; } = true; 

    }
}
