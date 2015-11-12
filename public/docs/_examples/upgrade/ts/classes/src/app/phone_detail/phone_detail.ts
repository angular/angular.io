// #docregion
import PhoneDetailCtrl from './phone_detail_controller';

export default angular.module('phonecat.detail', [
    'ngRoute',
    'phonecat.core'
  ])
  .controller('PhoneDetailCtrl', PhoneDetailCtrl);
