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

  app.HeroLifecycleComponent = HeroComponent;

})(window.app = window.app || {});
