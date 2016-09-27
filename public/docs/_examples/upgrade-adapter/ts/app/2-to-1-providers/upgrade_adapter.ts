import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// #docregion ngmodule
import { Heroes } from './heroes';

@NgModule({
  imports: [ BrowserModule ],
  providers: [ Heroes ]
})
export class AppModule {}
// #enddocregion ngmodule
angular.module('heroApp', [])
  .controller('MainCtrl', function() {
    this.message = 'Hello world';
  });

// #docregion
import { UpgradeAdapter } from '@angular/upgrade';
export const upgradeAdapter = new UpgradeAdapter(AppModule);
