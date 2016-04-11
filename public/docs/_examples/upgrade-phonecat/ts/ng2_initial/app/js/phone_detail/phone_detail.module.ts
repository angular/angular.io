// #docregion
import PhoneDetailCtrl from './phone_detail.controller';

export default angular.module('phonecat.detail', [
    'ngRoute',
    'phonecat.core'
  ])
  .controller('PhoneDetailCtrl', PhoneDetailCtrl);
