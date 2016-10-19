import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// #docregion downgradecomponent, ngmodule
import { HeroDetailComponent } from './hero-detail.component';

// #enddocregion downgradecomponent
@NgModule({
  imports: [ BrowserModule ],
  declarations: [ HeroDetailComponent ]
})
export class AppModule {}
// #enddocregion ngmodule
import { UpgradeAdapter } from '@angular/upgrade';

const upgradeAdapter = new UpgradeAdapter(AppModule);

// #docregion downgradecomponent

angular.module('heroApp', [])
  .directive('heroDetail', upgradeAdapter.downgradeNg2Component(HeroDetailComponent));

// #enddocregion downgradecomponent

upgradeAdapter.bootstrap(
  document.querySelector('hero-app'),
  ['heroApp'],
  {strictDi: true}
);
// #enddocregion bootstrap
