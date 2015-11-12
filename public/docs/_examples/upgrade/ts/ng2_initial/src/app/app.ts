/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../typings/angularjs/angular-route.d.ts" />

// #docregion adapter-import
import {UpgradeAdapter} from 'angular2/upgrade';
// #enddocregion adapter-import
// #docregion adapter-state-import
import upgradeAdapter from './core/upgrade_adapter';
// #enddocregion adapter-state-import
// #docregion http-import
import {HTTP_PROVIDERS} from 'angular2/http';
// #enddocregion http-import
import core from './core/core';
import phoneList from './phone_list/phone_list';
import phoneDetail from './phone_detail/phone_detail';

// #docregion add-http-providers
upgradeAdapter.addProvider(HTTP_PROVIDERS);
// #enddocregion add-http-providers

angular.module('phonecatApp', [
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

// #docregion bootstrap
upgradeAdapter.bootstrap(document.documentElement, ['phonecatApp']);
// #enddocregion bootstrap
