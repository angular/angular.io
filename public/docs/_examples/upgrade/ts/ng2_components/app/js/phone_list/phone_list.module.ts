// #docregion
import PhoneList from './phone_list.component';
import upgradeAdapter from '../core/upgrade_adapter';

export default angular.module('phonecat.list', [
    'phonecat.core'
  ])
  .directive('pcPhoneList',
    <angular.IDirectiveFactory>upgradeAdapter.downgradeNg2Component(PhoneList));
