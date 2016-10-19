declare var angular: any;
// #docregion ngmodule
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [ BrowserModule ]
})
export class AppModule {}
// #enddocregion ngmodule
angular.module('heroApp', [])
  .controller('MainCtrl', function() {
    this.message = 'Hello world';
  });


// #docregion bootstrap
import { UpgradeAdapter } from '@angular/upgrade';

// #enddocregion bootstrap

// This blank is expected to trigger the docplaster

// #docregion bootstrap

const upgradeAdapter = new UpgradeAdapter(AppModule);

upgradeAdapter.bootstrap(document.body, ['heroApp'], {strictDi: true});
// #enddocregion bootstrap
