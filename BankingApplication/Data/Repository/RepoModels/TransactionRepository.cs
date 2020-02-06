using BankingApplication.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using Repository;
using BankingApplication.Data;
using System.Threading.Tasks;
using System.Linq;
using X.PagedList;

namespace RepositoryWrapper
{
    public class TransactionRepository : Repository<Transaction>, IRepository<Transaction>
    {
        public TransactionRepository(BankAppContext context) : base(context)
        { 
        }

        public Task<IPagedList<Transaction>> GetPages(int id, int page, int pagesize)
        {
            return _context.Transaction.Where(x => x.AccountNumber == id).ToPagedListAsync(page, pagesize);
        }

        public Task<List<Transaction>> GetTransactionsByAccountID(int id)
        {
            return _context.Transaction.Where(x => x.AccountNumber == id).ToListAsync();
        }
    }
}
