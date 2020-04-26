using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using McMaster.AspNetCore.LetsEncrypt;
using System.IO;

namespace CrudVueNET
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {



            services.AddControllers();

            var connectionString = Configuration.GetConnectionString("DefaultConnection");
            services.AddDbContext<ApplicationDbContext>(options => options.UseSqlite(connectionString));



            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
              .AddJwtBearer(options =>
              {
                  options.Authority = Configuration["Okta:AuthorityJWBToken"];
                  options.Audience = "api://default";
              });


            //services.AddAuthentication(options =>
            //{
            //    options.DefaultAuthenticateScheme = CookieAuthenticationDefaults.AuthenticationScheme;
            //    options.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
            //    options.DefaultChallengeScheme = OktaDefaults.MvcAuthenticationScheme;
            //})
            //.AddCookie()
            //.AddOktaMvc(new OktaMvcOptions
            //{
            //    // Replace these values with your Okta configuration
            //    OktaDomain = Configuration["Okta:Authority"],
            //    ClientId = Configuration["Okta:ClientId"],
            //    ClientSecret = Configuration["Okta:ClientSecret"]
            //});

            services.AddControllersWithViews();

            //services.AddCors();

            services.AddCors(options =>
            {
                options.AddPolicy("VueCorsPolicy", builder =>
                {
                    builder
                      .WithOrigins("http://localhost:8080", "https://localhost:8081")
                      .AllowAnyHeader()
                      .AllowAnyMethod()
                      .AllowCredentials();
                });
            });

            //services.AddLetsEncrypt()
            //    .PersistDataToDirectory(new DirectoryInfo("LetsEncrypt/"), "password");
            //.PersistCertificatesToAzureKeyVault(o =>
            //{
            //    o.AzureKeyVaultEndpoint = "https://[url].vault.azure.net/";
            //}); 
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ApplicationDbContext dbContext)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }



            dbContext.Database.EnsureCreated();

            app.UseStaticFiles();

            app.UseRouting();
            //must appear after routing
            app.UseCors("VueCorsPolicy");

            // app.UseCors(builder => builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());

            app.UseHttpsRedirection();

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });


        }
    }
}
