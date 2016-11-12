declare var angular: any;
// #docregion ngmodule
import { NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { UpgradeModule, downgradeInjectable } from '@angular/upgrade/static';

import { heroDetailComponent } from './hero-detail.component';
import { Heroes } from './heroes';

@NgModule({
  imports: [
    BrowserModule,
    UpgradeModule
  ],
  providers: [ Heroes ]
})
export class AppModule {
  ngDoBootstrap() {}
}
// #docregion register
angular.module('heroApp', [])
  .factory('heroes', downgradeInjectable(Heroes))
  .component('heroDetail', heroDetailComponent);
// #enddocregion register

platformBrowserDynamic().bootstrapModule(AppModule).then(platformRef => {
  let upgrade = platformRef.injector.get(UpgradeModule) as UpgradeModule;
  upgrade.bootstrap(document.body, ['heroApp'], {strictDi: true});
});
