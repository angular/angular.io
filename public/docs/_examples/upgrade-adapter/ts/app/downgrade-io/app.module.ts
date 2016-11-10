declare var angular: any;
import { NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { UpgradeModule, downgradeComponent } from '@angular/upgrade/static';

import { MainController } from './main.controller';

// #docregion downgradecomponent
import { HeroDetailComponent } from './hero-detail.component';

// #enddocregion downgradecomponent
@NgModule({
  imports: [
    BrowserModule,
    UpgradeModule
  ],
  declarations: [
    HeroDetailComponent
  ],
  entryComponents: [
    HeroDetailComponent
  ]
})
export class AppModule {
  ngDoBootstrap() {}
}
// #docregion downgradecomponent

angular.module('heroApp', [])
  .controller('MainController', MainController)
  .directive('heroDetail', downgradeComponent({
    component: HeroDetailComponent,
    inputs: ['hero'],
    outputs: ['deleted']
  }));

// #enddocregion downgradecomponent

platformBrowserDynamic().bootstrapModule(AppModule).then(platformRef => {
  let upgrade = platformRef.injector.get(UpgradeModule);
  upgrade.bootstrap(document.body, ['heroApp'], {strictDi: true});
});
