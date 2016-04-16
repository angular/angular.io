// #docregion
import Phone from './phone.service';

export default angular.module('core.phone', ['ngResource'])
  .factory('Phone', Phone);
