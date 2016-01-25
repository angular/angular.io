(function() {
  'use strict';
  
  angular.module('heroApp', [])
    .run(function() { console.log('running') });

  // #docregion bootstrap
  angular.bootstrap(document.body, ['heroApp'], {strictDi: true});
  // #enddocregion bootstrap

})();
