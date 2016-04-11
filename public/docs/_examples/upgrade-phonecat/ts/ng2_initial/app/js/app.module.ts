// #docregion adapter-import
import {UpgradeAdapter} from 'angular2/upgrade';
// #enddocregion adapter-import
// #docregion adapter-state-import
import upgradeAdapter from './core/upgrade_adapter';
// #enddocregion adapter-state-import
// #docregion http-import
import {HTTP_PROVIDERS} from 'angular2/http';
// #enddocregion http-import
import core from './core/core.module';
import phoneList from './phone_list/phone_list.module';
import phoneDetail from './phone_detail/phone_detail.module';

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
      templateUrl: 'js/phone_list/phone_list.html',
      controller: 'PhoneListCtrl',
      controllerAs: 'vm'
    }).
    when('/phones/:phoneId', {
      templateUrl: 'js/phone_detail/phone_detail.html',
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
