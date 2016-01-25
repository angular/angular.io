(function(app) {
  'use strict';

  // #docregion upgradeanddefinecomponent
  var HeroDetail = app.upgradeAdapter.upgradeNg1Component('heroDetail');

  function ContainerComponent() {
    this.hero = new app.Hero(1, 'Windstorm');
    this.heroDeleted = function(event) {
      console.log(event);
    };
  }
  ContainerComponent.annotations = [
    new ng.core.ComponentMetadata({
      selector: 'my-container',
      template: '<h1>Tour of Heroes</h1>' +
        '<hero-detail [hero]="hero"' +
        '             (deleted)="heroDeleted($event)">' +
        '</hero-detail>',
      directives: [HeroDetail]
    })
  ];
  // #enddocregion upgradeanddefinecomponent
  
  angular.module('heroApp')
    .directive('myContainer', app.upgradeAdapter.downgradeNg2Component(ContainerComponent))


})(window.app || (window.app = {}));
