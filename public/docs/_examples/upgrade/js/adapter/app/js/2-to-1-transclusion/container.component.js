// #docregion
(function(app) {
  'use strict';

  // #docregion upgradeanddefinecomponent
  var HeroDetail = app.upgradeAdapter.upgradeNg1Component('heroDetail');

  function ContainerComponent() {
    this.hero = new app.Hero(1, 'Windstorm', 'a descr');
  }
  ContainerComponent.annotations = [
    new ng.core.ComponentMetadata({
      selector: 'my-container',
      template: '<hero-detail [hero]="hero">' +
          '<!-- Everything here will get transcluded -->' +
          '<p>{{hero.description}}</p>' +
        '</hero-detail>',
      directives: [HeroDetail]
    })
  ];
  // #enddocregion upgradeanddefinecomponent
  
  angular.module('heroApp')
    .directive('myContainer', app.upgradeAdapter.downgradeNg2Component(ContainerComponent));

})(window.app || (window.app = {}));
