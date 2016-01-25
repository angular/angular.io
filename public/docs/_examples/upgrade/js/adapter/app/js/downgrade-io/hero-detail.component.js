// #docregion
(function(app) {
  'use strict';

  // #docregion definecomponent
  function HeroDetailComponent() {
    this.deleted = new ng.core.EventEmitter();
  }
  HeroDetailComponent.annotations = [
    new ng.core.ComponentMetadata({
      selector: 'hero-detail',
      template: '<h2>{{hero.name}} details!</h2>' +
        '<div><label>id: </label>{{hero.id}}</div>' +
        '<button (click)="onDelete()">Delete</button>',
      inputs: ['hero'],
      outputs: ['deleted']
    })
  ];
  HeroDetailComponent.prototype.onDelete = function() {
    this.deleted.emit(this.hero);
  }
  // #enddocregion definecomponent

  angular.module('heroApp')
    .directive('heroDetail', app.upgradeAdapter.downgradeNg2Component(HeroDetailComponent));


})(window.app || (window.app = {}));
