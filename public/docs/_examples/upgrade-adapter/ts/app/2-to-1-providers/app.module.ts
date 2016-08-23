import { heroDetailComponent } from './hero-detail.component';
import { Heroes } from './heroes';
import { upgradeAdapter } from './upgrade_adapter';

declare var angular: any;

// #docregion register
upgradeAdapter.addProvider(Heroes);

angular.module('heroApp', [])
  .factory('heroes', upgradeAdapter.downgradeNg2Provider(Heroes))
  .component('heroDetail', heroDetailComponent);
// #enddocregion register

upgradeAdapter.bootstrap(
  document.querySelector('hero-app'),
  ['heroApp'],
  {strictDi: true}
);
