// #docregion
import {Phones} from './phones.service';
import checkmarkFilter from './checkmark.filter';
import upgradeAdapter from './upgrade_adapter';

upgradeAdapter.addProvider(Phones);

export default angular.module('phonecat.core', [])
  .factory('phones', upgradeAdapter.downgradeNg2Provider(Phones))
  .filter('checkmark', checkmarkFilter);
