/*
// #docregion ng1bootstrap
document.addEventListener('DOMContentLoaded', function() {
  angular.bootstrap(document.body, ['phonecatApp']);
});
// #enddocregion ng1bootstrap
*/

// #docregion ng2bootstrap
(function(app) {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    app.upgradeAdapter.bootstrap(document.body, ['phonecatApp']);
  });

})(window.app || (window.app = {}));
// #enddocregion ng2bootstrap
