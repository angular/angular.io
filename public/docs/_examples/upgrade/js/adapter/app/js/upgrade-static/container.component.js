// #docregion
(function(app) {
  'use strict';

  // #docregion upgradeanddefinecomponent
  var HeroDetail = app.upgradeAdapter.upgradeNg1Component('heroDetail');

  function ContainerComponent() {
  }
  ContainerComponent.annotations = [
    new ng.core.ComponentMetadata({
      selector: 'my-container',
      template: '<h1>Tour of Heroes</h1><hero-detail></hero-detail>',
      directives: [HeroDetail]
    })
  ];
  // #enddocregion upgradeanddefinecomponent
  
  angular.module('heroApp')
    .directive('myContainer', app.upgradeAdapter.downgradeNg2Component(ContainerComponent))

})(window.app || (window.app = {}));
