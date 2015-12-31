// #docregion bootstrap
import {upgradeAdapter} from './upgrade_adapter';

// #enddocregion bootstrap

declare var angular:any;

angular.module('heroApp', [])
  .run(() => console.log('running'));

// #docregion bootstrap

upgradeAdapter.bootstrap(document.body, ['heroApp'], {strictDi: true});
// #enddocregion bootstrap
