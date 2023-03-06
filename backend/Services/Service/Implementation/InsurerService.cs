using Domain.Models;
using Infraestructure.Data;
using Microsoft.EntityFrameworkCore;
using Services.Service.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Service.Implementation
{
    public class InsurerService : IInsurerService
    {
        private readonly DataContext _context;
        public InsurerService(DataContext context)
        {
            _context = context; 
        }

        public async Task<ServiceResponse<List<Insurer>>> GetAllInsurers()
        {
            var serviceResponse = new ServiceResponse<List<Insurer>>();

            try 
            {
                serviceResponse.Data = await _context.Insurers.ToListAsync();
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message; 
            }

            return serviceResponse; 
        }
        public async Task<ServiceResponse<Insurer>> PostInsurer(Insurer newInsurer)
        { 
                var serviceResponse = new ServiceResponse<Insurer>();

            try
            {
                _context.Insurers.Add(newInsurer); 
                await _context.SaveChangesAsync();

                serviceResponse.Data = newInsurer;

            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message; 
            }

            return serviceResponse;
            
        }

        public async Task<ServiceResponse<Insurer>> UpdateInsurer(Insurer updatedInsurer)
        {
            var serviceResponse = new ServiceResponse<Insurer>(); 

            try
            {
                var insurer = await _context.Insurers.FirstOrDefaultAsync(i => i.Id  == updatedInsurer.Id);
                if (insurer is null)
                    throw new Exception($"Insurer with Id '{updatedInsurer.Id}' not found");

                insurer.Name = updatedInsurer.Name;
                insurer.Commission = updatedInsurer.Commission;
                insurer.State = updatedInsurer.State; 

                await _context.SaveChangesAsync();
                serviceResponse.Data = updatedInsurer; 
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message; 
            }

            return serviceResponse; 
        }

        public async Task<ServiceResponse<Insurer>> DeleteInsurer(int id)
        {
            var serviceResponse = new ServiceResponse<Insurer>(); 

            try
            {
                var insurer = await _context.Insurers.FirstOrDefaultAsync(i => i.Id == id);
                if (insurer is null)
                    throw new Exception($"Insurer with Id '{id}' not found."); 

                _context.Insurers.Remove(insurer);
                await _context.SaveChangesAsync();
                serviceResponse.Data = insurer; 
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message; 
            }

            return serviceResponse; 
        }

    }
}
