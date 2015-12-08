// #docregion
var MyApp = ng.Component({
  selector: 'my-app',
  // #docregion template
  templateUrl: 'app/app.3.html'
  // #enddocregion template
})
// #docregion class
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

// #enddocregion class
document.addEventListener('DOMContentLoaded', function () {
  ng.bootstrap(MyApp);
});
// #enddocregion
