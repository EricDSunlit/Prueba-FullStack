using Domain.Models;
using Infraestructure.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Services.Service.Implementation;
using Services.Service.Interface;

namespace InsurersWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InsurerController : ControllerBase
    {
        private readonly IInsurerService _insurerService; 
        public InsurerController(IInsurerService insurerService)
        {
            _insurerService = insurerService; 
        }

        [HttpPost]
        public async Task<ActionResult<ServiceResponse<Insurer>>> AddInsurer(Insurer insurer)
        {
            return Ok(await _insurerService.PostInsurer(insurer)); 
        }

        [HttpGet]
        public async Task<ActionResult<ServiceResponse<List<Insurer>>>> GetAllInsurers()
        {
            return Ok(await _insurerService.GetAllInsurers()); 
        }

        [HttpPut]
        public async Task<ActionResult<ServiceResponse<Insurer>>> UpdateInsurer(Insurer updatedInsurer)
        {
            var response = await _insurerService.UpdateInsurer(updatedInsurer);

            if (response.Data is null)
                return NotFound(response); 

            return Ok(response);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<ServiceResponse<Insurer>>> DeleteInsurer(int id)
        {
            var response = await _insurerService.DeleteInsurer(id);
            if (response.Data is null)
                return NotFound(response);

            return Ok(response); 
        }

    }
}
