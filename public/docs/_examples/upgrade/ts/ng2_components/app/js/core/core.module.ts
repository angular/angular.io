// #docregion
import {Phones} from './Phones';
import upgradeAdapter from './upgrade_adapter';

upgradeAdapter.addProvider(Phones);

export default angular.module('phonecat.core', [])
  .factory('phones', upgradeAdapter.downgradeNg2Provider(Phones));
