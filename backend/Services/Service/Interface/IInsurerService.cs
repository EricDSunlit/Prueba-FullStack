using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Service.Interface
{
    public interface IInsurerService
    {
        Task<ServiceResponse<List<Insurer>>> GetAllInsurers();

        Task<ServiceResponse<Insurer>> UpdateInsurer(Insurer updatedInsurer);

        Task<ServiceResponse<Insurer>> PostInsurer(Insurer newInsurer); 

        Task<ServiceResponse<Insurer>> DeleteInsurer(int id);
    }
}
