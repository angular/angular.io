import { ContainerComponent } from './container.component';
import { heroDetailComponent } from './hero-detail.component';
import { upgradeAdapter } from './upgrade_adapter';

declare var angular: any;

angular.module('heroApp', [])
  .directive('myContainer', upgradeAdapter.downgradeNg2Component(ContainerComponent))
  .component('heroDetail', heroDetailComponent);

upgradeAdapter.bootstrap(
  document.querySelector('hero-app'),
  ['heroApp'],
  {strictDi: true}
);
