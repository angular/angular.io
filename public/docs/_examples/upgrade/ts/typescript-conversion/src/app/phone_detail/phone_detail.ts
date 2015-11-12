// #docregion
import PhoneDetailCtrl from './phone_detail_controller';

export default angular.module('phonecat.detail', [
    'phonecat.core',
    'ngRoute'
  ])
  .controller('PhoneDetailCtrl', PhoneDetailCtrl);
