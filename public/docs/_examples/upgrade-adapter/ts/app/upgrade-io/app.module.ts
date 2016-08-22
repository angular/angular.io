import { heroDetail } from './hero-detail.component';
import { ContainerComponent } from './container.component';
import { upgradeAdapter } from './upgrade_adapter';


declare var angular: any;

angular.module('heroApp', [])
  .component('heroDetail', heroDetail)
  .directive('myContainer', upgradeAdapter.downgradeNg2Component(ContainerComponent));

upgradeAdapter.bootstrap(
  document.querySelector('hero-app'),
  ['heroApp'],
  {strictDi: true}
);
