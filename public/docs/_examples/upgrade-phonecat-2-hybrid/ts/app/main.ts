// #docregion import-adapter
import { UpgradeAdapter } from '@angular/upgrade';
// #enddocregion import-adapter
// #docregion import-http
import { HTTP_PROVIDERS } from '@angular/http';
// #enddocregion import-http
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
let upgradeAdapter = new UpgradeAdapter();
// #enddocregion init-adapter

// #docregion add-http
upgradeAdapter.addProvider(HTTP_PROVIDERS);
// #enddocregion add-http
// #docregion phone-service

upgradeAdapter.addProvider(Phone);

// #enddocregion phone-service
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
    <angular.IDirectiveFactory>
      upgradeAdapter.downgradeNg2Component(PhoneListComponent)
  );
// #enddocregion phone-list
// #docregion phone-detail

angular.module('phoneDetail')
  .directive(
    'phoneDetail',
    <angular.IDirectiveFactory>
      upgradeAdapter.downgradeNg2Component(PhoneDetailComponent)
  );
// #enddocregion phone-detail

// #docregion bootstrap
upgradeAdapter.bootstrap(document.documentElement, ['phonecatApp']);
// #enddocregion bootstrap
