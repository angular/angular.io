(function(app) {

  // #docregion
  app.HeroDIComponent = HeroComponent;
  
  function HeroComponent(dataService) {
    this.name = dataService.getHeroName();
  }
  HeroComponent.parameters = [
    app.DataService
  ];
  HeroComponent.annotations = [
    new ng.core.Component({
      selector: 'hero-di',
      template: '<h1>Hero: {{name}}</h1>'
    })
  ];
  // #enddocregion

  app.HeroesDIModule =
    ng.core.NgModule({
      imports: [ ng.platformBrowser.BrowserModule ],
      providers: [ app.DataService ],
      declarations: [ HeroComponent ],
      bootstrap: [ HeroComponent ]
    })
    .Class({
      constructor: function() {}
    });

})(window.app = window.app || {});
