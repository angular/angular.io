(function(app) {

  var ActiveLabelComponent = ng.core.Component({
    selector: 'active-label',
    template: '<span class="active-label"' +
                    '*ngIf="active">' +
      'Active' +
    '</span>'
  }).Class({
    constructor: function() { },
    activate: function() {
      this.active = true;
    }
  });

  // #docregion content
  var HeroComponent = ng.core.Component({
    selector: 'a-hero',
    template: '<h2 [class.active]=active>' +
      '{{hero.name}} ' +
      '<ng-content></ng-content>' +
    '</h2>',
    inputs: ['hero'],
    queries: {
      label: new ng.core.ContentChild(
                   ActiveLabelComponent)
    }
  }).Class({
    constructor: function() { },
    activate: function() {
      this.active = true;
      this.label.activate();
    }
  });
  // #enddocregion content

  // #docregion view
  var AppComponent = ng.core.Component({
    selector: 'heroes-queries',
    template:
      '<a-hero *ngFor="let hero of heroData"' +
            '[hero]="hero">' +
        '<active-label></active-label>' +
      '</a-hero>' +
      '<button (click)="activate()">' +
        'Activate' +
      '</button>',
    directives: [
      HeroComponent,
      ActiveLabelComponent
    ],
    queries: {
      heroCmps: new ng.core.ViewChildren(
                      HeroComponent)
    }
  }).Class({
    constructor: function() {
      this.heroData = [
        {id: 1, name: 'Windstorm'},
        {id: 2, name: 'Superman'}
      ];
    },
    activate: function() {
      this.heroCmps.forEach(function(cmp) {
        cmp.activate();
      });
    }
  });
  // #enddocregion view

  app.HeroesQueriesComponent = AppComponent;

})(window.app = window.app || {});
