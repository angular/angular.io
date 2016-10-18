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
    bootstrap(HeroComponent);
    bootstrap(app.HeroComponentDsl);
    bootstrap(app.HeroLifecycleComponent);
    bootstrap(app.HeroDIComponent, [app.DataService]);
    bootstrap(app.HeroDIInlineComponent, [app.DataService]);
    bootstrap(app.HeroDIInjectComponent, [
      { provide: 'heroName', useValue: 'Windstorm' }
    ]);
    bootstrap(app.HeroDIInjectComponent2, [
      { provide: 'heroName', useValue: 'Bombasto' }
    ]);
    bootstrap(app.HeroDIInjectAdditionalComponent);
    bootstrap(app.HeroIOComponent);
    bootstrap(app.HeroesHostBindingsComponent);
    bootstrap(app.HeroesQueriesComponent);
  });

  // #docregion appimport
})(window.app = window.app || {});
// #enddocregion appimport
