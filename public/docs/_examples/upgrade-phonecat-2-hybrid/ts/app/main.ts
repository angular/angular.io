// #docregion import-adapter
declare var angular: angular.IAngularStatic;
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { UpgradeModule, downgradeComponent, downgradeInjectable } from '@angular/upgrade/static';

import { AppModule } from './app.module';
// #enddocregion import-adapter
// #docregion phone-service
import { Phone } from './core/phone/phone.service';

// #enddocregion phone-service
// #docregion phone-list
import { PhoneListComponent } from './phone-list/phone-list.component';

// #enddocregion phone-list
// #docregion phone-detail
import { PhoneDetailComponent } from './phone-detail/phone-detail.component';

// #enddocregion phone-detail
// #docregion init-adapter
// let upgradeAdapter = new UpgradeAdapter(AppModule);
// #enddocregion init-adapter

// #docregion routeparams
// upgradeAdapter.upgradeNg1Provider('$routeParams');
// #enddocregion routeparams

// #docregion phone-service

angular.module('core.phone')
  .factory('phone', downgradeInjectable(Phone));
// #enddocregion phone-service
// #docregion phone-list

angular.module('phoneList')
  .directive(
    'phoneList',
    downgradeComponent({component: PhoneListComponent}) as angular.IDirectiveFactory
  );
// #enddocregion phone-list
// #docregion phone-detail

angular.module('phoneDetail')
  .directive(
    'phoneDetail',
    downgradeComponent({component: PhoneDetailComponent}) as angular.IDirectiveFactory
  );
// #enddocregion phone-detail

// #docregion bootstrap
// upgradeAdapter.bootstrap(document.documentElement, ['phonecatApp']);
platformBrowserDynamic().bootstrapModule(AppModule).then(platformRef => {
  let upgrade = platformRef.injector.get(UpgradeModule) as UpgradeModule;
  upgrade.bootstrap(document.body, ['phonecatApp'], {strictDi: true});
});
// #enddocregion bootstrap
