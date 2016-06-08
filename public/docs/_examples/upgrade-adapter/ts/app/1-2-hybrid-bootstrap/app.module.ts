declare var angular: any;

// #docregion bootstrap
import { UpgradeAdapter } from '@angular/upgrade';

// #enddocregion bootstrap

angular.module('heroApp', [])
  .controller('MainCtrl', function() {
    this.message = 'Hello world';
  });

// #docregion bootstrap

const upgradeAdapter = new UpgradeAdapter();

upgradeAdapter.bootstrap(document.body, ['heroApp'], {strictDi: true});
// #enddocregion bootstrap
