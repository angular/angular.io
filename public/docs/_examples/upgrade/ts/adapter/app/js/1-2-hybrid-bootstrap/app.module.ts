declare var angular:any;

// #docregion bootstrap
import {UpgradeAdapter} from 'angular2/upgrade';

// #enddocregion bootstrap

angular.module('heroApp', [])
  .run(() => console.log('running'));

// #docregion bootstrap

const upgradeAdapter = new UpgradeAdapter();

upgradeAdapter.bootstrap(document.body, ['heroApp'], {strictDi: true});
// #enddocregion bootstrap
