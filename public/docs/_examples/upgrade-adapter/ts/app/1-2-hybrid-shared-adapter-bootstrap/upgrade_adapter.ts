import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [ BrowserModule ]
})
export class AppModule {}

angular.module('heroApp', [])
  .controller('MainCtrl', function() {
    this.message = 'Hello world';
  });

// #docregion
import { UpgradeAdapter } from '@angular/upgrade';
export const upgradeAdapter = new UpgradeAdapter(AppModule);
