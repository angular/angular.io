// #docregion
import PhoneDetail from './phone-detail.component';
import phone from '../core/phone/phone.module';
import upgradeAdapter from '../core/upgrade-adapter';

export default angular.module('phoneDetail', [
    'ngRoute',
    phone.name
  ])
  .directive('phoneDetail',
    <angular.IDirectiveFactory>upgradeAdapter.downgradeNg2Component(PhoneDetail));
