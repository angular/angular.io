// #docregion bootstrap
import { upgradeAdapter } from './upgrade_adapter';

// #enddocregion bootstrap

declare var angular: any;

angular.module('heroApp', [])
  .controller('MainCtrl', function() {
    this.message = 'Hello world';
  });

// #docregion bootstrap

upgradeAdapter.bootstrap(document.body, ['heroApp'], {strictDi: true});
// #enddocregion bootstrap
