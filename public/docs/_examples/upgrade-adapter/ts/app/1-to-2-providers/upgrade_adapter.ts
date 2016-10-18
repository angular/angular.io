import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HeroDetailComponent } from './hero-detail.component';

@NgModule({
  imports: [ BrowserModule ],
  declarations: [ HeroDetailComponent ]
})
export class AppModule {}

angular.module('heroApp', [])
  .controller('MainCtrl', function() {
    this.message = 'Hello world';
  });

// #docregion
import { UpgradeAdapter } from '@angular/upgrade';
export const upgradeAdapter = new UpgradeAdapter(AppModule);
