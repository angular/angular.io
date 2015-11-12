// #docregion pre-bootstrap
// #docregion typings
/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../typings/angularjs/angular-route.d.ts" />
// #enddocregion

import core from './core/core';
import phoneList from './phone_list/phone_list';
import phoneDetail from './phone_detail/phone_detail';

angular.module('phonecatApp', [
  'ngAnimate',
  'ngRoute',
  core.name,
  phoneList.name,
  phoneDetail.name
]).config(configure);

configure.$inject = ['$routeProvider'];

function configure($routeProvider) {
  $routeProvider.
    when('/phones', {
      templateUrl: 'app/phone_list/phone_list.html',
      controller: 'PhoneListCtrl',
      controllerAs: 'vm'
    }).
    when('/phones/:phoneId', {
      templateUrl: 'app/phone_detail/phone_detail.html',
      controller: 'PhoneDetailCtrl',
      controllerAs: 'vm'
    }).
    otherwise({
      redirectTo: '/phones'
    });
}
// #enddocregion pre-bootstrap
// #docregion bootstrap
angular.bootstrap(document.documentElement, ['phonecatApp']);
// #enddocregion bootstrap
