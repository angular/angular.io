// #docplaster
// #docregion start

var MyApp = ng.Component({
  selector: 'my-app',
  // #docregion template
  templateUrl: 'app/app.1.html'
  // #enddocregion template
})
.Class({
  constructor: function() {
    this.title = 'Tour of Heroes';
    this.myHero = 'Windstorm';
  }
});
// #enddocregion start

// #docregion bootstrap
document.addEventListener('DOMContentLoaded', function () {
  ng.bootstrap(MyApp);
});
//#enddocregion bootstrap
