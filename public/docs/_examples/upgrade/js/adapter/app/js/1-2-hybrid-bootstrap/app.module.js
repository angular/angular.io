(function() {
  'use strict';
  
  angular.module('heroApp', [])
    .run(() => console.log('running'));

  // #docregion bootstrap
  var upgradeAdapter = new ng.upgrade.UpgradeAdapter();

  upgradeAdapter.bootstrap(document.body, ['heroApp'], {strictDi: true});
  // #enddocregion bootstrap

})();
