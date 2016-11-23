// #docregion redirect
app.UseStaticFiles(new StaticFileOptions
        {
            RequestPath = new PathString("/app"),
            FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "app"))
        });
  app.UseStaticFiles(new StaticFileOptions
        {
            RequestPath = new PathString("/node_modules"),
            FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "node_modules"))
        });
// #enddocregion redirect

// #docregion redirect-using
using Microsoft.Extensions.FileProviders;
using System.IO;

// #enddocregion redirect-using

// #docregion lowercaseurls
services.Configure<RouteOptions>(options => options.LowercaseUrls = true);
// #enddocregion lowercaseurls

// #docregion lowercaseurls-using
using Microsoft.AspNetCore.Routing
// #enddocregion lowercaseurls-using

// #docregion route-default
app.UseMvc(routes =>
              {
                  routes.MapRoute(
                      name: "default",
                      template: "{controller=Home}/{action=Index}/{id?}");
              });
// #enddocregion route-default

// #docregion route-new
app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
                routes.MapRoute(
                    name: "angular",
                    template: "app/{*routes}",
                    defaults: new { controller = "App", action = "Index" }
                );
            });
// #enddocregion route-new