// #docregion
import { UpgradeAdapter } from '@angular/upgrade';
import { NgModule, forwardRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ContainerComponent } from './container.component';

export const upgradeAdapter = new UpgradeAdapter(forwardRef(() => AppModule));

// #docregion heroupgrade
const HeroDetail = upgradeAdapter.upgradeNg1Component('heroDetail');

@NgModule({
  imports: [ BrowserModule ],
  declarations: [ ContainerComponent, HeroDetail ]
})
export class AppModule {}
// #enddocregion heroupgrade

angular.module('heroApp', [])
  .controller('MainCtrl', function() {
    this.message = 'Hello world';
  });
