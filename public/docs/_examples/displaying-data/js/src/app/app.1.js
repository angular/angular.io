// #docregion
(function() {

var AppComponent = ng.core.Component({
  selector: 'my-app',
  templateUrl: 'app/app.1.html'
})
.Class({
  constructor: function() {
    this.title = 'Tour of Heroes';
    this.myHero = 'Windstorm';
  }
});

document.addEventListener('DOMContentLoaded', function () {
  ng.platform.browser.bootstrap(AppComponent);
});

})();
// #enddocregion
