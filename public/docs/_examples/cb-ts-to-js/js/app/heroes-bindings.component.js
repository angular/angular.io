(function(app) {

  // #docregion
  var HeroesComponent = ng.core.Component({
    selector: 'heroes-bindings',
    template: '<h1 [class.active]="active">' +
      'Tour of Heroes' +
    '</h1>',
    host: {
      '[title]': 'title',
      '[class.heading]': 'hClass',
      '(click)': 'clicked()',
      '(dblclick)': 'doubleClicked($event)'
    }
  }).Class({
    constructor: function() {
      this.title = 'Tooltip content';
      this.hClass = true;
    },
    clicked: function() {
      this.active = !this.active;
    },
    doubleClicked: function(evt) {
      this.active = true;
    }
  });
  // #enddocregion
  app.HeroesHostBindingsComponent = HeroesComponent;

})(window.app = window.app || {});
