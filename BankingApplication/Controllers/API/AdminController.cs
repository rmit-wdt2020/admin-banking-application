using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BankingApplication.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RepositoryWrapper;

namespace BankingApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly Wrapper _repo;

        public AdminController(Wrapper repo)
        {
            _repo = repo;
        }

        [HttpGet("customers")]
        public Task<List<Customer>> Get()
        {
            return _repo.Customer.GetWithLock();
        }

        [HttpGet("customers/{id}")]
        public ValueTask<Customer> Get(int id)
        {
            return _repo.Customer.GetByID(id);
        }

        [HttpPost("togglelock")]
        public async Task<IActionResult> Post([FromBody] string id)
        {
            var login = await _repo.Login.GetWithCustomer(id);
            if (login != null)
            {
                if (!login.Locked)
                {
                    login.Lock(DateTime.UtcNow.AddMinutes(1));
                }
                else
                {
                    login.UnLock();
                }
                await _repo.SaveChanges();
                return Ok();
            }
            return BadRequest();
        }

        [HttpGet("accounts/{id}")]
        public Task<Customer> GetWithAccounts(int id)
        {
            return _repo.Customer.GetWithAccounts(id);
        }
    }
}