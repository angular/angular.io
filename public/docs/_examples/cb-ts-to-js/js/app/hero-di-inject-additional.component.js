(function(app) {

app.HeroDIInjectAdditionalComponent = HeroDIInjectAdditionalComponent;

HeroDIInjectAdditionalComponent.annotations = [
  new ng.core.Component({
    selector: 'hero-di-inject-additional',
    template: '<hero-title title="Tour of Heroes"></hero-title>'
  })
];

function HeroDIInjectAdditionalComponent() {}

})(window.app = window.app || {});

////// DSL Version /////////
(function(app) {

app.HeroDIInjectAdditionalDslComponent = ng.core.Component({
  selector: 'hero-di-inject-additional-dsl',
  template: '<hero-title-dsl title="Tour of Heroes"></hero-title-dsl>'
}).Class({
  constructor: function HeroDIInjectAdditionalDslComponent() { }
});

})(window.app = window.app || {});
