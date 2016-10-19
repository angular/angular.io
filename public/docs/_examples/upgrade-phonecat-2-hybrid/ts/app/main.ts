// #docregion import-adapter
import { UpgradeAdapter } from '@angular/upgrade';

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
let upgradeAdapter = new UpgradeAdapter(AppModule);
// #enddocregion init-adapter

// #docregion routeparams
upgradeAdapter.upgradeNg1Provider('$routeParams');
// #enddocregion routeparams

// #docregion phone-service

angular.module('core.phone')
  .factory('phone', upgradeAdapter.downgradeNg2Provider(Phone));
// #enddocregion phone-service
// #docregion phone-list

angular.module('phoneList')
  .directive(
    'phoneList',
    upgradeAdapter.downgradeNg2Component(PhoneListComponent) as angular.IDirectiveFactory
  );
// #enddocregion phone-list
// #docregion phone-detail

angular.module('phoneDetail')
  .directive(
    'phoneDetail',
    upgradeAdapter.downgradeNg2Component(PhoneDetailComponent) as angular.IDirectiveFactory
  );
// #enddocregion phone-detail

// #docregion bootstrap
upgradeAdapter.bootstrap(document.documentElement, ['phonecatApp']);
// #enddocregion bootstrap
