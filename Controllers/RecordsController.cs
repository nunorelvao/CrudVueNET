using System.Collections.Generic;
using System.Threading.Tasks;
using CrudVueNET.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Okta.AspNetCore;

namespace CrudVueNET.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class RecordsController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public RecordsController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        // GET api/records
        [HttpGet]
        public async Task<ActionResult<List<Record>>> Get()
        {
            //if (!HttpContext.User.Identity.IsAuthenticated)
            //{
            //    return Challenge(OktaDefaults.MvcAuthenticationScheme);
            //}
            return await _dbContext.Records.ToListAsync();
        }

        // GET api/records/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Record>> Get(string id)
        {
            return await _dbContext.Records.FindAsync(id);
        }

        // POST api/records
        [HttpPost]
        public async Task Post(Record model)
        {
            await _dbContext.AddAsync(model);

            await _dbContext.SaveChangesAsync();
        }

        // PUT api/records/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, Record model)
        {
            var exists = await _dbContext.Records.AnyAsync(f => f.Id == id);
            if (!exists)
            {
                return NotFound();
            }

            _dbContext.Records.Update(model);

            await _dbContext.SaveChangesAsync();

            return Ok();

        }

        // DELETE api/records/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var entity = await _dbContext.Records.FindAsync(id);

            _dbContext.Records.Remove(entity);

            await _dbContext.SaveChangesAsync();

            return Ok();
        }
    }
}
