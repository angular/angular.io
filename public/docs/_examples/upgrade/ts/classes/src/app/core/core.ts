// #docregion
import Phone from './phone_factory';
import checkmarkFilter from './checkmark_filter';

export default angular.module('phonecat.core', [
    'ngResource'
  ])
  .factory('Phone', Phone)
  .filter('checkmark', checkmarkFilter);
