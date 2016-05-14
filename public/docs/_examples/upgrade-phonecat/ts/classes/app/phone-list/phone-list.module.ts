// #docregion
import phoneList from './phone-list.component';
import phone from '../core/phone/phone.module';

export default angular.module('phoneList', [phone.name])
  .component('phoneList', phoneList);
