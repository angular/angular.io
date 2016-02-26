// #docregion
import PhoneDetail from './phone_detail.component';
import upgradeAdapter from '../core/upgrade_adapter';

export default angular.module('phonecat.detail', [
    'ngRoute',
    'phonecat.core'
  ])
  .directive('pcPhoneDetail',
    <angular.IDirectiveFactory>upgradeAdapter.downgradeNg2Component(PhoneDetail))
