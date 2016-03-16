(function(app) {

  // #docregion
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
  app.HeroDIComponent = HeroComponent;

})(window.app = window.app || {});
