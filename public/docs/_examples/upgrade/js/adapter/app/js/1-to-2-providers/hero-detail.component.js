// #docregion
(function(app) {
  'use strict';

  // #docregion register
  app.upgradeAdapter.upgradeNg1Provider('heroes');
  // #enddocregion register

  // #docregion definecomponent
  function HeroDetailComponent(heroes) {
    this.hero = heroes.get()[0];
  }
  HeroDetailComponent.parameters = ['heroes'];
  HeroDetailComponent.annotations = [
    new ng.core.ComponentMetadata({
      selector: 'hero-detail',
      template: '<h2>{{hero.id}}: {{hero.name}}</h2>'
    })
  ];
  // #enddocregion definecomponent
  
  angular.module('heroApp')
    .directive('heroDetail', app.upgradeAdapter.downgradeNg2Component(HeroDetailComponent));

})(window.app || (window.app = {}));
