// #docplaster
// #docregion appexport
(function(app) {
  // #enddocregion appexport

  // #docregion metadata
  // #docregion appexport
  // #docregion constructorproto
  function HeroComponent() {
    this.title = "Hero Detail";
  }
  HeroComponent.prototype.getName = function() { return 'Windstorm'; };
  // #enddocregion constructorproto

  // #enddocregion appexport
  HeroComponent.annotations = [
    new ng.core.Component({
      selector: 'hero-view',
      template: '<h1>{{title}}: {{getName()}}</h1>'
    })
  ];
  // #enddocregion metadata

  app.HeroesModule =
    ng.core.NgModule({
      imports: [ ng.platformBrowser.BrowserModule ],
      declarations: [ HeroComponent ],
      bootstrap: [ HeroComponent ]
    })
    .Class({
      constructor: function() {}
    });

  // #docregion appexport
  app.HeroComponent = HeroComponent;

})(window.app = window.app || {});
// #enddocregion appexport
