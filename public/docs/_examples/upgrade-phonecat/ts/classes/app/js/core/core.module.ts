// #docregion
import Phone from './phone.factory';
import checkmarkFilter from './checkmark.filter';

export default angular.module('phonecat.core', [
    'ngResource'
  ])
  .factory('Phone', Phone)
  .filter('checkmark', checkmarkFilter);
