// #docregion
'use strict';

angular.module('phonecat.list')
  .controller('PhoneListCtrl', PhoneListCtrl);

PhoneListCtrl.$inject = ['phones'];

function PhoneListCtrl(phones) {
  var ctrl = this;
  phones.query().subscribe(function(phones) {
    ctrl.phones = phones;
  });
  ctrl.orderProp = 'age';
}
