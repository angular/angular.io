// #docregion
(function() {

var AppComponent = ng.Component({
  selector: 'my-app',
  // #docregion template
  templateUrl: 'app/app.2.html',
  // #enddocregion template
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
  ng.bootstrap(AppComponent);
});
// #enddocregion
})();
