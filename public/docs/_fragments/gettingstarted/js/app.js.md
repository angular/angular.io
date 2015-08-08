```
var AppComponent = ng
    .Component({
      selector: 'my-app'
    })
    .View({
      template: '<h1 id="output">My First Angular 2 App</h1>'
    })
    .Class({
      constructor: function () { }
    });

document.addEventListener('DOMContentLoaded', function() {
  ng.bootstrap(AppComponent);
});

```