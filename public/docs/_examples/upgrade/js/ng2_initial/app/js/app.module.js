// #docregion add-http-providers
(function(app) {
  'use strict';

  app.upgradeAdapter.addProvider(ng.http.HTTP_PROVIDERS);

  // #enddocregion add-http-providers
  angular.module('phonecatApp', [
      'ngRoute',
      'phonecat.core',
      'phonecat.detail',
      'phonecat.list'
    ]).config(['$routeProvider',
      function($routeProvider) {
        $routeProvider.
          when('/phones', {
            template: '<phone-list></phone-list>'
          }).
          when('/phones/:phoneId', {
            template: '<phone-detail></phone-detail>'
          }).
          otherwise({
            redirectTo: '/phones'
          });
      }]);

  // #docregion add-http-providers

})(window.app || (window.app = {}));
  // #enddocregion add-http-providers
