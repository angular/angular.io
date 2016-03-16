(function(app) {

  // #docregion
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
  // #enddocregion
  app.HeroDIInjectComponent = HeroComponent;

})(window.app = window.app || {});
