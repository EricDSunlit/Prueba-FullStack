using Domain.Models;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Domain.Middlewares
{
    public class AuthorizationMiddleware : IMiddleware
    {
        private const string Token = "1234"; 

        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            if (!IsValidToken(context.Request))
            {
                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                context.Response.ContentType = "application/json"; 

                var serviceResponse = new ServiceResponse<HttpResponse>() ;
                serviceResponse.Success = false;
                serviceResponse.Message = "No autorizado"; 

                var response = JsonConvert.SerializeObject(serviceResponse); 


                await context.Response.WriteAsync(response);
                return; 
            }

            await next(context); 
        }
    private static bool IsValidToken(HttpRequest request)
    {
            return request.Headers.TryGetValue("token", out var tokenValue) && tokenValue.Any(token => token == Token); 
    }

    }

}
