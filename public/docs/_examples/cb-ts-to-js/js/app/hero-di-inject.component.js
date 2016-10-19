(function(app) {

// #docregion parameters
  function HeroComponent(name) {
    this.name = name;
  }
  HeroComponent.parameters = [
    'heroName'
  ];
  HeroComponent.annotations = [
    new ng.core.Component({
      selector: 'hero-di-inject',
      template: '<h1>Hero: {{name}}</h1>'
    })
  ];
// #enddocregion parameters

  app.HeroesDIInjectModule =
    ng.core.NgModule({
      imports: [ ng.platformBrowser.BrowserModule ],
      providers: [ { provide: 'heroName', useValue: 'Windstorm' } ],
      declarations: [ HeroComponent ],
      bootstrap: [ HeroComponent ]
    })
    .Class({
      constructor: function() {}
    });
  
})(window.app = window.app || {});

(function(app) {
// #docregion ctor
  var HeroComponent = ng.core.Component({
    selector: 'hero-di-inline2',
    template: '<h1>Hero: {{name}}</h1>'
  })
  .Class({
    constructor:
      [new ng.core.Inject('heroName'), 
       function(name) {
         this.name = name;
       }]
  });
// #enddocregion ctor

  app.HeroesDIInjectModule2 =
    ng.core.NgModule({
      imports: [ ng.platformBrowser.BrowserModule ],
      providers: [ { provide: 'heroName', useValue: 'Bombasto' } ],
      declarations: [ HeroComponent ],
      bootstrap: [ HeroComponent ]
    })
    .Class({
      constructor: function() {}
    });

})(window.app = window.app || {});
