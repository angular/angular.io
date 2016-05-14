// #docregion
import {Phone} from './phone.service';
import upgradeAdapter from '../upgrade-adapter';

upgradeAdapter.addProvider(Phone);

export default angular.module('core.phone', [])
  .factory('phone', upgradeAdapter.downgradeNg2Provider(Phone));
