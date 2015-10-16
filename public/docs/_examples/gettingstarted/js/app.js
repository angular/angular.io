// #docregion dsl
(function() {

// #docregion class-w-annotations
var AppComponent = ng
  .Component({
    selector: 'my-app',
    template: '<h1>My First Angular 2 App</h1>'
  })
  .Class({
    constructor: function () { }
  });
// #enddocregion class-w-annotations

// #docregion bootstrap
document.addEventListener('DOMContentLoaded', function() {
  ng.bootstrap(AppComponent);
});
// #enddocregion bootstrap

})();
// #enddocregion dsl

/* Non DSL Approach */
(function() {

// #docregion no-dsl
function  AppComponent () {}

AppComponent.annotations = [
  new ng.Component({
    selector: 'my-app',
    template: '<h1 id="output">My First Angular 2 App</h1>'
  })
];
// #enddocregion
})();
