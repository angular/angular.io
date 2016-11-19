# Cookbook Introduction

This cookbook describes how to build a .NET Core Web application with an Angular app running inside the MVC architecture. 
.NET Core is cross platform. You can develop .NET Core application on Windows, MacOS or Linux, with tools of your own choices.  This cookbook will describe how to build the application with Visual Studio 2015 on Windows. You can develop and run the project created in Visual Studio 2015 on all supported platforms with .NET Core CLI, but it is out of this cookbook’s scope, please refer to .NET Core official documentations.

In this cookbook, you will create a new .NET Core Web Application project and then create an Angular app from scratch, using only visual studio 2015. 

# Prerequisite

1. Install Visual studio 2015 Update 3

1. Install .NET Core Tools for visual studio 2015

1. Install .Net Core SDK

1. Install Typescript 2 for visual studio 2015

1. Install Node.js Tools for visual studio 2015 (optional)

# Create a new .NET Core Web Application

* Select `File` | `New` | `Project` from the menu
* In the `New Project` dialog, select `Templates` | `Visual C#` | `.NET Core`
* Select `ASP.NET Core Web Application (.NET Core) template, give the project a name, and click OK.
* Select `Web Application` and click OK. Wait for visual studio to restore packages.

# Create Configuration files for your Angular app. 

In the root folder, create `package.json` and `tsconfig.json` files. Populate them by pasting the contents below.

Package.json
```
{
  "name": "angular-dotnet-core",
  "version": "1.0.0",
  "licenses": [
    {
      "type": "MIT",
      "url": "https://github.com/angular/angular.io/blob/master/LICENSE"
    }
  ],
  "dependencies": {
    "@angular/common": "~2.2.0",
    "@angular/compiler": "~2.2.0",
    "@angular/core": "~2.2.0",
    "@angular/forms": "~2.2.0",
    "@angular/http": "~2.2.0",
    "@angular/platform-browser": "~2.2.0",
    "@angular/platform-browser-dynamic": "~2.2.0",
    "@angular/router": "~3.2.0",
    "@angular/upgrade": "~2.2.0",
    "angular-in-memory-web-api": "~0.1.15",
    "core-js": "^2.4.1",
    "reflect-metadata": "^0.1.8",
    "rxjs": "5.0.0-beta.12",
    "systemjs": "0.19.39",
    "zone.js": "^0.6.25"
  },
  "devDependencies": {
    "@types/core-js": "^0.9.34",
    "typescript": "^2.0.3"
  }
}
```
Tsconfig.json
```
{
  "compileOnSave": true,
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "moduleResolution": "node",
    "sourceMap": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "removeComments": false,
    "noImplicitAny": false
  },
  "exclude": [
    "node_modules/*"
  ],
  "typeRoots": [
    "node_modules/@types/"
  ]
}
```

## Create your Angular application

Create an `app` subfolder off the project root directory.

Create the following files in the `app` subfolder: 

Systemjs.config.js
```
/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  System.config({
    paths: {
      // paths serve as alias
      'npm:': '/node_modules/'
    },
    // map tells the System loader where to look for things
    map: {
      app: '',
      // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
      '@angular/upgrade': 'npm:@angular/upgrade/bundles/upgrade.umd.js',
      // other libraries
      'rxjs':                      'npm:rxjs',
      'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js'
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        main: './main.js',
        defaultExtension: 'js'
      },
      rxjs: {
        defaultExtension: 'js'
      }
    }
  });
})(this);
```

Main.ts
```
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);
```

App.module.ts
```
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
```

App.component.ts
```
import { Component } from '@angular/core';
@Component({
  selector: 'my-app',
  template: '<h1>Hello Angular!</h1>'
})
export class AppComponent { }
```

## Edit _layout.cshtml to host the Angular application

Open `Views/shared/_layout.cshtml` file and insert Angular application’s scripts and `<my-app>` tag.

_layout.cshtml
```
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>@ViewData["Title"] - AngularWithDotnetCore</title>
    <base href="/app/" />
    <environment names="Development">
        <link rel="stylesheet" href="~/lib/bootstrap/dist/css/bootstrap.css" />
        <link rel="stylesheet" href="~/css/site.css" />
    </environment>
    <environment names="Staging,Production">
        <link rel="stylesheet" href="https://ajax.aspnetcdn.com/ajax/bootstrap/3.3.6/css/bootstrap.min.css"
              asp-fallback-href="~/lib/bootstrap/dist/css/bootstrap.min.css"
              asp-fallback-test-class="sr-only" asp-fallback-test-property="position" asp-fallback-test-value="absolute" />
        <link rel="stylesheet" href="~/css/site.min.css" asp-append-version="true" />
    </environment>
    @Html.ApplicationInsightsJavaScript(TelemetryConfiguration)

    <!-- 1. Load libraries -->
    <!-- Polyfill for older browsers -->
    <script src="~/node_modules/core-js/client/shim.min.js"></script>
    <script src="~/node_modules/zone.js/dist/zone.js"></script>
    <script src="~/node_modules/reflect-metadata/Reflect.js"></script>
    <script src="~/node_modules/systemjs/dist/system.src.js"></script>
<!-- 2. Configure SystemJS -->
    <script src="systemjs.config.js"></script>
    <script>
      System.import('app').catch(function(err){ console.error(err); });
    </script>
</head>
<body>
    
    <div class="navbar navbar-inverse navbar-fixed-top">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a asp-area="" asp-controller="Home" asp-action="Index" class="navbar-brand">AngularWithDotnetCore</a>
            </div>
            <div class="navbar-collapse collapse">
                <ul class="nav navbar-nav">
                    <li><a asp-area="" asp-controller="Home" asp-action="Index">Home</a></li>
                    <li><a asp-area="" asp-controller="Home" asp-action="About">About</a></li>
                    <li><a asp-area="" asp-controller="Home" asp-action="Contact">Contact</a></li>
                </ul>
            </div>
        </div>
    </div>
<div class="container body-content">
<my-app>Loading…</my-app>
        @RenderBody()
        <hr />
        <footer>
            <p>&copy; 2016 - AngularWithDotnetCore</p>
        </footer>
    </div>

    <environment names="Development">
        <script src="~/lib/jquery/dist/jquery.js"></script>
        <script src="~/lib/bootstrap/dist/js/bootstrap.js"></script>
        <script src="~/js/site.js" asp-append-version="true"></script>
    </environment>
    <environment names="Staging,Production">
        <script src="https://ajax.aspnetcdn.com/ajax/jquery/jquery-2.2.0.min.js"
                asp-fallback-src="~/lib/jquery/dist/jquery.min.js"
                asp-fallback-test="window.jQuery">
        </script>
        <script src="https://ajax.aspnetcdn.com/ajax/bootstrap/3.3.6/bootstrap.min.js"
                asp-fallback-src="~/lib/bootstrap/dist/js/bootstrap.min.js"
                asp-fallback-test="window.jQuery && window.jQuery.fn && window.jQuery.fn.modal">
        </script>
        <script src="~/js/site.min.js" asp-append-version="true"></script>
    </environment>

    @RenderSection("scripts", required: false)
</body>
</html>
```

## Build and run the application.

.NET Core MVC application works but the Angular app does not. If you open the developer's tool, and in the console tab, you will see a lot of 404 erros. 

### 404 Errors

These 404 Errors indicate that the browser could not find a lot of files in `app` folder and `node_modules` folder. But we have an `app` folder and `node_modules` at the root of the project, why the browser cannot find it?

### Redirect request path to physical folder

.NET Core only exposes the `wwwroot` folder to browsers. All other contents in the project are private by default. It's designed as such so that you know exactly which part of the project is public. If the app asks for `/app` in a request, .NET Core looks for a physical folder in `wwwroot` folder named `app`.

Angular app runs in browser and therefore the app and its supporting libraries (`node_modules`) must be accessible to browsers. You can simply develop the angular app inside of `wwwroot`. Your `node_modules` folder would be a sub folder of `wwwroot`. Your `package.json` file would have to stay in `wwwroot` as well. However, visual studio’s npm package manager only works in the root project folder. Therefore, you would have to manage the npm packages outside of Visual Studio 2015. 

Fortunately, you can redirect the request `/app` and `/node_modules` to any chosen physical folder within the project. Open your `startup.cs` file and insert the following code under line `app.UseStaticFiles();`.  

```
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
```
The above code asks .NET Core to redirect any request path starting with `/app` and `/node_modules` to the physical `app` folder and `node_modules` folder at the root project folder.

Rebuid and run the application again, you will see "Angular Works" at every page of the MVC application.

## Move Angular app to its own Controller and View

## Add Angular routes



