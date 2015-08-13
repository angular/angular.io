// #docregion
function AppComponent() {}

AppComponent.annotations = [
  new angular.ComponentAnnotation({
    selector: 'my-app'
  }),
  new angular.ViewAnnotation({
    template: '<h1 id="output">My first Angular 2 App</h1>'
  })
];

// #docregion bootstrap
document.addEventListener('DOMContentLoaded', function() {
  angular.bootstrap(AppComponent);
});
// #enddocregion