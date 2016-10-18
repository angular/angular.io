import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UpgradeAdapter } from '@angular/upgrade';

import { MainController } from './main.controller';
import { HeroDetailComponent } from './hero-detail.component';

@NgModule({
  imports: [ BrowserModule ],
  declarations: [ HeroDetailComponent ]
})
export class AppModule {}

declare var angular: any;
const upgradeAdapter = new UpgradeAdapter(AppModule);

angular.module('heroApp', [])
  .controller('MainController', MainController)
  .directive('heroDetail', upgradeAdapter.downgradeNg2Component(HeroDetailComponent));

upgradeAdapter.bootstrap(
  document.querySelector('hero-app'),
  ['heroApp'],
  {strictDi: true}
);
