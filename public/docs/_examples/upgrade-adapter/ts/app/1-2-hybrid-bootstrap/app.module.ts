declare var angular: any;
// #docregion ngmodule
import { NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { UpgradeModule } from '@angular/upgrade/static';

@NgModule({
  imports: [
    BrowserModule,
    UpgradeModule
  ]
})
export class AppModule {
  ngDoBootstrap() {}
}
// #enddocregion ngmodule
angular.module('heroApp', [])
  .controller('MainCtrl', function() {
    this.message = 'Hello world';
  });

// #docregion bootstrap
platformBrowserDynamic().bootstrapModule(AppModule).then(platformRef => {
  let upgrade = platformRef.injector.get(UpgradeModule) as UpgradeModule;
  upgrade.bootstrap(document.body, ['heroApp'], {strictDi: true});
});
// #enddocregion bootstrap
