// #docregion
(function() {
  'use strict';

  // #docregion definecomponent
  var heroDetailComponent = {
    template: '<h2>{{heroDetail.hero.id}}: {{heroDetail.hero.name}}</h2>',
    controller: ['heroes', function(heroes) {
      this.hero = heroes.get()[0];
    }]
  };
  // #enddocregion definecomponent
  
  angular.module('heroApp')
    .component('heroDetail', heroDetailComponent);

})()
