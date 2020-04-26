using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CrudVueNET.Controllers
{
    public class SpaController : Controller
    {
        // Enumerate all SPA urls so we boot the Vue app correctly
        // Alternatively, use this as the 404 page so any unhandled url will boot the vue app
        [HttpGet("/")]
        [HttpGet("/home")]
        [HttpGet("/implicit/callback")]
        public ActionResult Index(string id) => File("/index.html", "text/html");
    }
}
