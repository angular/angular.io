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
  
  // #enddocregion constructorproto
  // #enddocregion appexport
  HeroComponent.annotations = [
    new ng.core.Component({
      selector: 'hero-view',
      template:
        '<h1>Hero: {{getName()}}</h1>'
    })
  ];
  // #docregion constructorproto
  HeroComponent.prototype.getName =
    function() {return 'Windstorm';};
  // #enddocregion constructorproto
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
