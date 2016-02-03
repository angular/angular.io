// #docregion
(function(app) {
  'use strict';

  // #docregion definecomponent
  function HeroDetailComponent() {
  }
  HeroDetailComponent.annotations = [
    new ng.core.ComponentMetadata({
      selector: 'hero-detail',
      template: '<h2>{{hero.name}}</h2>' +
        '<div>' +
          '<ng-content></ng-content>' +
        '</div>',
      inputs: ['hero']
    })
  ];
  // #enddocregion definecomponent

  angular.module('heroApp')
    .directive('heroDetail', app.upgradeAdapter.downgradeNg2Component(HeroDetailComponent));

})(window.app || (window.app = {}));
