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
      pipes: [app.PhoneFilterPipe, app.OrderByPipe],
      directives: [ng.router.RouterLink]
    })
  ];
  // #enddocregion metadata

})(window.app || (window.app = {}));
