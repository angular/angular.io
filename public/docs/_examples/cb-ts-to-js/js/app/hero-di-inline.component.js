(function(app) {
  // #docregion
  var HeroComponent = ng.core.Component({
    selector: 'hero-di-inline',
    template: '<h1>Hero: {{name}}</h1>'
  })
  .Class({
    constructor:
      [app.DataService, 
       function(service) {
         this.name = service.getHeroName();
       }]
  });
  // #enddocregion
  app.HeroDIInlineComponent = HeroComponent;
})(window.app = window.app || {});
