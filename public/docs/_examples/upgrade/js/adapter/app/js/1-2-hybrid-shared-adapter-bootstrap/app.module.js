// #docregion bootstrap
(function(app) {
  'use strict';
  
  angular.module('heroApp', [])
    .run(() => console.log('running'));

  app.upgradeAdapter.bootstrap(document.body, ['heroApp'], {strictDi: true});

})(window.app || (window.app = {}))
