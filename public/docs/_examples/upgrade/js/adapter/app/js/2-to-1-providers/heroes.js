// #docregion
(function(app) {
  'use strict';

  // #docregion define
  function Heroes() {
  }
  Heroes.prototype.get = function() {
    return [
      new app.Hero(1, 'Windstorm'),
      new app.Hero(2, 'Spiderman')
    ];
  };
  // #enddocregion define

  // #docregion register
  app.upgradeAdapter.addProvider(Heroes);

  angular.module('heroApp')
    .factory('heroes', app.upgradeAdapter.downgradeNg2Provider(Heroes));
  // #enddocregion register
  
})(window.app || (window.app = {}));
