```
function AppComponent() {}

AppComponent.annotations = [
  new angular.ComponentAnnotation({
    selector: 'my-app'
  }),
  new angular.ViewAnnotation({
    template: '<h1 id="output">My First Angular 2 App</h1>'
  })
];

document.addEventListener('DOMContentLoaded', function() {
  angular.bootstrap(AppComponent);
});

```