// #docregion
(function() {

var AppComponent = ng.core.Component({
  selector: 'my-app',
  templateUrl: 'app/app.3.html'
})
.Class({
  constructor: function() {
    this.title = 'Tour of Heroes';
    // #docregion heroes
    this.heroes = [
      new Hero(1, 'Windstorm'),
      new Hero(13, 'Bombasto'),
      new Hero(15, 'Magneta'),
      new Hero(20, 'Tornado')
    ];
    this.myHero = this.heroes[0];
    // #enddocregion heroes
  }
});

document.addEventListener('DOMContentLoaded', function () {
  ng.platform.browser.bootstrap(AppComponent);
});

})();
// #enddocregion
