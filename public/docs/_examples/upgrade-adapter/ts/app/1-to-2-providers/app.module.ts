import { HeroDetailComponent } from './hero-detail.component';
import { HeroesService } from './heroes.service';
import { upgradeAdapter } from './upgrade_adapter';

declare var angular: any;

// #docregion register
angular.module('heroApp', [])
  .service('heroes', HeroesService)
  .directive('heroDetail',
    upgradeAdapter.downgradeNg2Component(HeroDetailComponent));

upgradeAdapter.upgradeNg1Provider('heroes');

// #enddocregion register

upgradeAdapter.bootstrap(
  document.querySelector('hero-app'),
  ['heroApp'],
  {strictDi: true}
);
