// #docplaster
(function(app) {

// #docregion
// #docregion appexport
// #docregion metadata
app.HeroComponent = HeroComponent; // "export"

HeroComponent.annotations = [
  new ng.core.Component({
    selector: 'hero-view',
    template: '<h1>{{title}}: {{getName()}}</h1>'
  })
];

// #docregion constructorproto
function HeroComponent() {
  this.title = "Hero Detail";
}

HeroComponent.prototype.getName = function() { return 'Windstorm'; };
// #enddocregion constructorproto

// #enddocregion metadata
// #enddocregion appexport
// #enddocregion

})(window.app = window.app || {});

//////////// DSL version ///////////

(function(app) {

// #docregion dsl
app.HeroDslComponent = ng.core.Component({
    selector: 'hero-view-dsl',
    template: '<h1>{{title}}: {{getName()}}</h1>',
  })
  .Class({
    constructor: function HeroDslComponent() {
      this.title = "Hero Detail";
    },

    getName: function() { return 'Windstorm'; }
  });
// #enddocregion dsl

})(window.app = window.app || {});
