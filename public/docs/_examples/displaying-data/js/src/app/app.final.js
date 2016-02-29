// #docplaster
// #docregion final
(function() {

var AppComponent = ng.core.Component({
  selector: 'my-app',
  templateUrl: 'app/app.final.html'
})
.Class({
  constructor: function() {
    this.title = 'Tour of Heroes';
    this.heroes = [
      new Hero(1, 'Windstorm'),
      new Hero(13, 'Bombasto'),
      new Hero(15, 'Magneta'),
      new Hero(20, 'Tornado')
    ];
    this.myHero = this.heroes[0];
  }
});

document.addEventListener('DOMContentLoaded', function () {
  ng.platform.browser.bootstrap(AppComponent);
});
//#enddocregion final
})();
