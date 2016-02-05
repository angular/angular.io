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

upgradeAdapter.addProvider(HTTP_PROVIDERS);
// #docregion upgrade-route-params
upgradeAdapter.upgradeNg1Provider('$routeParams');
// #enddocregion
angular.module('phonecatApp', [
  'ngRoute',
  core.name,
  phoneList.name,
  phoneDetail.name
]).config(configure);

configure.$inject = ['$routeProvider'];

function configure($routeProvider) {
  // #docregion list-route
  $routeProvider.
    when('/phones', {
      template: '<pc-phone-list></pc-phone-list>'
    }).
  // #enddocregion list-route
  // #docregion detail-route
    when('/phones/:phoneId', {
      template: '<pc-phone-detail></pc-phone-detail>'
    }).
  // #enddocregion detail-route
    otherwise({
      redirectTo: '/phones'
    });
}

// #docregion app-bootstrap
upgradeAdapter.bootstrap(document.documentElement, ['phonecatApp']);
// #enddocregion app-bootstrap
