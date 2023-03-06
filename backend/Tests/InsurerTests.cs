using Domain.Models;
using Infraestructure.Data;
using InsurersWebApi.Controllers;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Services.Service.Implementation;
using Services.Service.Interface;
using System.Runtime.CompilerServices;

namespace Tests
{
    public class InsurerTests
    {
        private readonly IInsurerService _service; 
        private readonly InsurerController _controller;

        public InsurerTests()
        {

            var options = new DbContextOptionsBuilder<DataContext>().UseInMemoryDatabase(databaseName: "test_sqlite").Options;
            var dbContext = new DataContext(options);


            _service = new InsurerService(dbContext);
            _controller = new InsurerController(_service);
        }


        [Fact]
        public async void GetAllInsurers_Test()
        {
            var result =  await _controller.GetAllInsurers();

            Assert.IsType<ActionResult<ServiceResponse<List<Insurer>>>>(result); 
        }

        [Fact]
        public async void AddInsurer_Test()
        {

            var insurer = new Insurer { Name = "Aseguradora", Commission = 13.33, State = true };
       
            var result = await _controller.AddInsurer(insurer);

            Assert.IsType<ActionResult<ServiceResponse<Insurer>>>(result);
        }
    }
}