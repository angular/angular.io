// #docregion pt1
(function(app) {
// #docregion hero-class-1
  function Hero(id, name) {
    this.id = id;
    this.name = name
  }
// #enddocregion hero-class-1

  app.AppComponent =
    ng.core.Component({
        selector: 'my-app',
        template: `
    <h1>{{title}}</h1>
    <h2>{{hero.name}} details!</h2>
    <div><label>id: </label>{{hero.id}}</div>
    <div>
      <label>name: </label>
      <input [(ngModel)]="hero.name" placeholder="name">
    </div>
    `
      })
      .Class({
        constructor: function() {
          this.title = 'Tour of Heroes';
          // #docregion hero-property-1
          this.hero = new Hero(1, 'Windstorm');
          // #enddocregion hero-property-1
        }
      });
})(window.app || (window.app = {}));
// #enddocregion pt1
