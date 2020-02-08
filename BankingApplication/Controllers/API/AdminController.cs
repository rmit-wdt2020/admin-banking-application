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
            return  _repo.Customer.GetByID(id);
        }

        [HttpPost("deletecustomer")]
        public async Task<IActionResult> DeleteCustomer([FromBody] int id)
        {
            var customer =  await _repo.Customer.GetByID(id);
            if(customer != null) 
            {
            await _repo.Customer.Delete(customer);
            await _repo.SaveChanges();
            return Ok();
            }
            return BadRequest();
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
        public Task<List<Account>> GetAccountsByCustomerID(int id)
        {
            return _repo.Account.GetAccountsByCustomerID(id);
        }

        [HttpGet("transactions/{id}")]
        public Task<List<Transaction>> GetTransactionsByAccountID(int id)
        {
            return _repo.Transaction.GetTransactionsByAccountID(id);
        }

        [HttpGet("transactions/{id}:{startdate}:{enddate}")]
        public Task<List<Transaction>> GetTransactionsByDate(int id, string startdate, string enddate)
        {
            return _repo.Transaction.GetWithinDate(id, DateTime.Parse(startdate), DateTime.Parse(enddate));
        }

        [HttpGet("billpay/{id}")]
        public Task<List<BillPay>> GetBillPayByAccountID(int id)
        {
            return _repo.BillPay.GetByAccountID(id);
        }

        [HttpPost("billlock")]
        public async Task<IActionResult> Post([FromBody] int id)
        {
            var bill = await _repo.BillPay.GetByID(id);
            if (bill != null)
            {
                if (!bill.Locked)
                {
                    bill.Lock();
                }
                else
                {
                    bill.UnLock();
                }
                await _repo.SaveChanges();
                return Ok();
            }
            return BadRequest();
        }

        [HttpPost("updatecustomer")]
        public async Task<IActionResult> Post([FromBody] Customer customer)
        {
            if (customer != null)
            {
                _repo.Customer.Update(customer);
                await _repo.SaveChanges();
                return Ok();
            }
            return BadRequest();
        }
    }
}