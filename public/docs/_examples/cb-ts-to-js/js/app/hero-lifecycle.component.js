// #docplaster
(function(app) {
  // #docregion
  function HeroComponent() {}
  // #enddocregion
  HeroComponent.annotations = [
    new ng.core.Component({
      selector: 'hero-lifecycle',
      template: '<h1>Hero: {{name}}</h1>'
    })
  ];
  // #docregion
  HeroComponent.prototype.ngOnInit =
    function() {
      this.name = 'Windstorm';
    };
  // #enddocregion

  app.HeroesLifecycleModule =
    ng.core.NgModule({
      imports: [ ng.platformBrowser.BrowserModule ],
      declarations: [ HeroComponent ],
      bootstrap: [ HeroComponent ]
    })
    .Class({
      constructor: function() {}
    });

})(window.app = window.app || {});
