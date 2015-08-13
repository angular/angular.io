(function() {

// #docregion
function AppComponent() {}

AppComponent.annotations = [
  new ng.ComponentAnnotation({
    selector: 'my-app'
  }),
  new ng.ViewAnnotation({
    template: '<h1 id="output">My First Angular 2 App</h1>'
  })
];

// #docregion bootstrap
document.addEventListener('DOMContentLoaded', function() {
  ng.bootstrap(AppComponent);
});
// #enddocregion

})()
