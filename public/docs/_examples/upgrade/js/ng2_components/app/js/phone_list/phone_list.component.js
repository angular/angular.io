// #docregion
(function(app) {
  'use strict';

  // #docregion construct
  app.PhoneList = function PhoneList(phones) {
    this.phones = phones.query();
    this.orderProp = 'age';
  }
  // #enddocregion construct
  app.PhoneList.parameters = [app.Phones];
  // #docregion metadata
  app.PhoneList.annotations = [
    new ng.core.ComponentMetadata({
      selector: 'phone-list',
      templateUrl: 'js/phone_list/phone_list.html',
      pipes: [app.PhoneFilterPipe, app.OrderByPipe]
    })
  ];
  // #enddocregion metadata

  angular.module('phonecat.list')
    .directive('phoneList', app.upgradeAdapter.downgradeNg2Component(app.PhoneList));

})(window.app || (window.app = {}));
