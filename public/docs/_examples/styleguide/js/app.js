(function() {
// #docregion
// #docregion class-w-annotations
var AppComponent = ng
    // #docregion component
    .Component({
      selector: 'my-app'
    })
    // #enddocregion
    // #docregion view
    .View({
      template: '<h1 id="output">My First Angular 2 App</h1>'
    })
    // #enddocregion
    // #docregion class
    .Class({
      constructor: function () { }
    });
    // #enddocregion
// #enddocregion

// #docregion bootstrap
document.addEventListener('DOMContentLoaded', function() {
  ng.bootstrap(AppComponent);
});
// #enddocregion
// #enddocregion

})();

/* Non DSL Approach */
(function() {

// #docregion no-dsl
function  AppComponent () {}

AppComponent.annotations = [
  new ng.ComponentAnnotation({
    selector: 'my-app'
  }),
  new ng.ViewAnnotation({
    template: '<h1 id="output">My First Angular 2 App</h1>'
  })
];
// #enddocregion
})();
