// #docplaster
// #docregion appexport
(function(app) {

  // #docregion component
  var HeroComponent = ng.core.Component({
      selector: 'hero-view-2',
      template:
        '<h1>Name: {{getName()}}</h1>',
    })
    .Class({
      constructor: function() {
      },
      getName: function() {
        return 'Windstorm';
      }
    });
  // #enddocregion component

  app.HeroesDslModule =
    ng.core.NgModule({
      imports: [ ng.platformBrowser.BrowserModule ],
      declarations: [ HeroComponent ],
      bootstrap: [ HeroComponent ]
    })
    .Class({
      constructor: function() {}
    });

})(window.app = window.app || {});
// #enddocregion appexport
