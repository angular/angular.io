declare var angular: any;
import { NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { UpgradeModule, downgradeComponent } from '@angular/upgrade/static';

import { heroDetail, HeroDetailComponent } from './hero-detail.component';
import { ContainerComponent } from './container.component';

// #docregion heroupgrade
@NgModule({
  imports: [
    BrowserModule,
    UpgradeModule
  ],
  declarations: [
    ContainerComponent,
    HeroDetailComponent
  ],
  entryComponents: [
    ContainerComponent
  ]
})
export class AppModule {
  ngDoBootstrap() {}
}
// #enddocregion heroupgrade

angular.module('heroApp', [])
  .component('heroDetail', heroDetail)
  .directive('myContainer', downgradeComponent({component: ContainerComponent}));

platformBrowserDynamic().bootstrapModule(AppModule).then(platformRef => {
  let upgrade = platformRef.injector.get(UpgradeModule);
  upgrade.bootstrap(document.body, ['heroApp'], {strictDi: true});
});
