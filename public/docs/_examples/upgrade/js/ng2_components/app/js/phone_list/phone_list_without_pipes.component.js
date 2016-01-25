(function(app) {
  'use strict';

  // #docregion component
  app.PhoneList = function PhoneList(phones) {
    var self = this;
    phones.query().subscribe(function(phones) {
      self.phones = phones;
    });
    self.orderProp = 'age';
  }
  app.PhoneList.parameters = [app.Phones];
  app.PhoneList.annotations = [
    new ng.core.ComponentMetadata({
      selector: 'phone-list',
      templateUrl: 'js/phone_list/phone_list.html'
    })
  ];
  // #enddocregion component

  // #docregion register
  angular.module('phonecat.list')
    .directive('phoneList', app.upgradeAdapter.downgradeNg2Component(app.PhoneList));
  // #enddocregion register

})(window.app || (window.app = {}));
