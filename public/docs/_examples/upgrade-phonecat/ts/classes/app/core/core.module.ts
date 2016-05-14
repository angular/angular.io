// #docregion
import checkmarkFilter from './checkmark/checkmark.filter';
import phone from './phone/phone.module';

export default angular.module('core', [phone.name])
  .filter('checkmark', checkmarkFilter);
