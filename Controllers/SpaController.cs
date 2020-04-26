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
        //Any url scheme as /xxxx will be returned (all remaining slash will just retun not ound)
        //[HttpGet("/{page}")]
        //[HttpGet("/implicit/callback")]
        [Route("/")] //route base without any slash
        [Route("{*url:regex(^(?!api/).*$)}")] //Route all except the "api/"
        public ActionResult Index(string url) => File("/index.html", "text/html");
    }
}
