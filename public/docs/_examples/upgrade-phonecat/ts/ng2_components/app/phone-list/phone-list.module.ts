// #docregion
import PhoneList from './phone-list.component';
import phone from '../core/phone/phone.module';
import upgradeAdapter from '../core/upgrade-adapter';

export default angular.module('phoneList', [phone.name])
  .directive('phoneList',
    <angular.IDirectiveFactory>upgradeAdapter.downgradeNg2Component(PhoneList));
