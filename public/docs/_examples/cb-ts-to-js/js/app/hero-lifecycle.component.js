// #docplaster
(function(app) {

// #docregion
app.HeroLifecycleComponent = HeroComponent;

HeroComponent.annotations = [
  new ng.core.Component({
    selector: 'hero-lifecycle',
    template: '<h1>Hero: {{name}}</h1>'
  })
];

function HeroComponent() { }

HeroComponent.prototype.ngOnInit = function() {
  // todo: fetch from server async
  setTimeout(() => this.name = 'Windstorm', 0);
};
// #enddocregion

})(window.app = window.app || {});

/////// DSL version ////

(function(app) {

// #docregion dsl
app.HeroLifecycleDslComponent = ng.core.Component({
    selector: 'hero-lifecycle-dsl',
    template: '<h1>Hero: {{name}}</h1>'
  })
  .Class({
    constructor: function HeroLifecycleDslComponent() { },
    ngOnInit: function() {
      // todo: fetch from server async
      setTimeout(() => this.name = 'Windstorm', 0);
    }
  });
// #enddocregion dsl

})(window.app = window.app || {});
