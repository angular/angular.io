// #docregion
(function() {
  'use strict';

  // #docregion definecomponent
  var heroDetailComponent = {
    bindings: {
      hero: '='
    },
    template: '<h2>{{hero.name}}</h2>' +
      '<div>' +
        '<ng-transclude></ng-transclude>' +
      '</div>'
  };
  // #enddocregion definecomponent
  
  angular.module('heroApp')
    .component('heroDetail', heroDetailComponent);

})();
