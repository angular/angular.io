declare var angular: any;
import { NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { UpgradeModule, downgradeComponent } from '@angular/upgrade/static';

import { HeroDetailComponent } from './hero-detail.component';
import { HeroesService } from './heroes.service';

// #docregion register
@NgModule({
  imports: [
    BrowserModule,
    UpgradeModule
  ],
  providers: [{
    provide: 'heroes',
    useFactory: (i: any) => i.get('heroes'),
    deps: ['$injector']
  }],
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

angular.module('heroApp', [])
  .service('heroes', HeroesService)
  .directive('heroDetail', downgradeComponent({component: HeroDetailComponent}));

// #enddocregion register

platformBrowserDynamic().bootstrapModule(AppModule).then(platformRef => {
  let upgrade = platformRef.injector.get(UpgradeModule);
  upgrade.bootstrap(document.body, ['heroApp'], {strictDi: true});
});
