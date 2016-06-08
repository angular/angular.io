import { UpgradeAdapter } from '@angular/upgrade';

import { MainController } from './main.controller';
import { HeroDetailComponent } from './hero-detail.component';

declare var angular: any;
const upgradeAdapter = new UpgradeAdapter();

angular.module('heroApp', [])
  .controller('MainController', MainController)
  .directive('heroDetail', upgradeAdapter.downgradeNg2Component(HeroDetailComponent));

upgradeAdapter.bootstrap(
  document.querySelector('hero-app'),
  ['heroApp'],
  {strictDi: true}
);
