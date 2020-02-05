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

        [HttpGet]
        public Task<List<Customer>> Get()
        {
            return _repo.Customer.GetAll();
        }

        [HttpGet("{id}")]
        public ValueTask<Customer> Get(int id)
        {
            return _repo.Customer.GetByID(id);
        }

        [HttpGet("accounts/{id}")]
        public Task<Customer> GetWithAccounts(int id)
        {
            return _repo.Customer.GetWithAccounts(id);
        }
    }
}