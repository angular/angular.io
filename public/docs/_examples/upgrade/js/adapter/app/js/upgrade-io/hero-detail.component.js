// #docregion
(function() {
  'use strict';

  // #docregion definecomponent
  var heroDetail = {
    bindings: {
      hero: '=',
      deleted: '&'
    },
    template: '<h2>{{heroDetail.hero.name}} details!</h2>' +
      '<div><label>id: </label>{{heroDetail.hero.id}}</div>' +
      '<button ng-click="heroDetail.onDelete()">Delete</button>',
    controller: function() {
      this.onDelete = function() {
        this.deleted({hero: this.hero});
      };
    }
  };
  // #enddocregion definecomponent

  angular.module('heroApp')
    .component('heroDetail', heroDetail);


})();
