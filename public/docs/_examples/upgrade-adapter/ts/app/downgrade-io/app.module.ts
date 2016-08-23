import { MainController } from './main.controller';
// #docregion downgradecomponent
import { HeroDetailComponent } from './hero-detail.component';

// #enddocregion downgradecomponent
import { UpgradeAdapter } from '@angular/upgrade';

const upgradeAdapter = new UpgradeAdapter();

// #docregion downgradecomponent

angular.module('heroApp', [])
  .controller('MainController', MainController)
  .directive('heroDetail', upgradeAdapter.downgradeNg2Component(HeroDetailComponent));

// #enddocregion downgradecomponent

upgradeAdapter.bootstrap(
  document.querySelector('hero-app'),
  ['heroApp'],
  {strictDi: true}
);
// #enddocregion bootstrap
