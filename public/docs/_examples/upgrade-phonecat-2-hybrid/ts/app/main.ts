// #docregion bootstrap
declare var angular: angular.IAngularStatic;
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { UpgradeModule } from '@angular/upgrade/static';

import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule).then(platformRef => {
  let upgrade = platformRef.injector.get(UpgradeModule) as UpgradeModule;
  upgrade.bootstrap(document.documentElement, ['phonecatApp']);
});
// #enddocregion bootstrap
