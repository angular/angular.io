(function(app) {

// #docregion
app.HeroDIInjectComponent = HeroDIInjectComponent;

HeroDIInjectComponent.annotations = [
  new ng.core.Component({
    selector: 'hero-di-inject',
    template: '<h1>Hero: {{name}}</h1>'
  })
];

HeroDIInjectComponent.parameters = [ 'heroName' ];

function HeroDIInjectComponent(name) {
  this.name = name;
}
// #enddocregion

})(window.app = window.app || {});

/////// DSL version ////////

(function(app) {

// #docregion dsl
app.HeroDIInjectDslComponent = ng.core.Component({
  selector: 'hero-di-inject-dsl',
  template: '<h1>Hero: {{name}}</h1>'
})
.Class({
  constructor: [
    new ng.core.Inject('heroName'),
    function HeroDIInjectDslComponent(name) {
      this.name = name;
    }
  ]
});
// #enddocregion dsl

})(window.app = window.app || {});
