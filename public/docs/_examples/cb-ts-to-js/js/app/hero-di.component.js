(function(app) {

  // #docregion
  app.HeroDIComponent = HeroDIComponent;

  HeroDIComponent.annotations = [
    new ng.core.Component({
      selector: 'hero-di',
      template: '<h1>Hero: {{name}}</h1>'
    })
  ];

  HeroDIComponent.parameters = [ app.DataService ];

  function HeroDIComponent(dataService) {
    this.name = dataService.getHeroName();
  }

  // #enddocregion


})(window.app = window.app || {});

////// DSL Version /////

(function(app) {

// #docregion dsl
app.HeroDIDslComponent = ng.core.Component({
  selector: 'hero-di-dsl',
  template: '<h1>Hero: {{name}}</h1>'
})
.Class({
  constructor: [
    app.DataService,
    function HeroDIDslComponent(service) {
      this.name = service.getHeroName();
    }
  ]
});
// #enddocregion dsl

})(window.app = window.app || {});
