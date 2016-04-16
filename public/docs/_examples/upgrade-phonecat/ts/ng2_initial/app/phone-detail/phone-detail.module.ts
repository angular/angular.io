// #docregion
import phoneDetail from './phone-detail.component';
import phone from '../core/phone/phone.module';

export default angular.module('phoneDetail', [
    'ngRoute',
    phone.name
  ])
  .component('phoneDetail', phoneDetail);
