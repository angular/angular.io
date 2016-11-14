(function(app) {

app.HeroIOComponent = HeroComponent;

HeroComponent.annotations = [
  new ng.core.Component({
    selector: 'hero-io',
    templateUrl: 'app/hero-io.component.html'
  })
];

function HeroComponent() { }

HeroComponent.prototype.onOk = function() {
  this.okClicked = true;
}

HeroComponent.prototype.onCancel = function() {
  this.cancelClicked = true;
}

})(window.app = window.app || {});

///// DSL Version ////

(function(app) {

app.HeroIODslComponent = ng.core.Component({
    selector: 'hero-io-dsl',
    templateUrl: 'app/hero-io-dsl.component.html'
  })
  .Class({
    constructor: function HeroIODslComponent() { },
    onOk: function() {
      this.okClicked = true;
    },
    onCancel: function() {
      this.cancelClicked = true;
    }
  });

})(window.app = window.app || {});
