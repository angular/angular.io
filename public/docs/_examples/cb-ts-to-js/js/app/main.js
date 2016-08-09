// #docplaster
// #docregion appimport
(function(app) {
  // #enddocregion appimport

  // #docregion ng2import
  var bootstrap =
    ng.platformBrowserDynamic.bootstrap;
  var LocationStrategy =
    ng.common.LocationStrategy;
  var HashLocationStrategy =
    ng.common.HashLocationStrategy;
  // #enddocregion ng2import

  // #docregion appimport
  var HeroComponent = app.HeroComponent;
  // #enddocregion appimport

  document.addEventListener('DOMContentLoaded', function() {
    var platformBrowserDynamic = ng.platformBrowserDynamic.platformBrowserDynamic();

    platformBrowserDynamic.bootstrapModule(app.HeroesModule);
    platformBrowserDynamic.bootstrapModule(app.HeroesDslModule);
    platformBrowserDynamic.bootstrapModule(app.HeroesLifecycleModule);
    platformBrowserDynamic.bootstrapModule(app.HeroesDIModule);
    platformBrowserDynamic.bootstrapModule(app.HeroDIInlineModule);
    platformBrowserDynamic.bootstrapModule(app.HeroesDIInjectModule);
    platformBrowserDynamic.bootstrapModule(app.HeroesDIInjectModule2);
    platformBrowserDynamic.bootstrapModule(app.HeroesDIInjectAdditionalModule);
    platformBrowserDynamic.bootstrapModule(app.HeroesIOModule);
    platformBrowserDynamic.bootstrapModule(app.HeroesHostBindingsModule);

    platformBrowserDynamic.bootstrapModule(app.HeroesQueriesModule);
  });

  // #docregion appimport
})(window.app = window.app || {});
// #enddocregion appimport
