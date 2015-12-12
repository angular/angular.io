// #docregion
(function() {

var AppComponent = ng.core.Component({
  selector: 'my-app',
  templateUrl: 'app/app.2.html'
})
// #docregion mock-heroes
.Class({
  constructor: function() {
    this.title = 'Tour of Heroes';
    this.heroes = ['Windstorm', 'Bombasto', 'Magneta'];
    this.myHero = this.heroes[0];
  }
});
// #enddocregion mock-heroes

document.addEventListener('DOMContentLoaded', function () {
  ng.platform.browser.bootstrap(AppComponent);
});

})();
// #enddocregion
