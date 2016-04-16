// #docregion adapter-import
import { UpgradeAdapter } from '@angular/upgrade';
// #enddocregion adapter-import
// #docregion http-import
import { HTTP_PROVIDERS } from '@angular/http';
// #enddocregion http-import
// #docregion adapter-state-import
import upgradeAdapter from './core/upgrade-adapter';
// #enddocregion adapter-state-import

import core from './core/core.module';
import phoneList from './phone-list/phone-list.module';
import phoneDetail from './phone-detail/phone-detail.module';
import appConfig from './app.config';

angular.module('phonecatApp', [
  'ngAnimate',
  'ngRoute',
  core.name,
  phoneList.name,
  phoneDetail.name
]).config(appConfig);

// #docregion add-http-providers
upgradeAdapter.addProvider(HTTP_PROVIDERS);
// #enddocregion add-http-providers

// #docregion upgrade-route-params
upgradeAdapter.upgradeNg1Provider('$routeParams');
// #enddocregion upgrade-route-params

// #docregion bootstrap
upgradeAdapter.bootstrap(document.documentElement, ['phonecatApp']);
// #enddocregion bootstrap
