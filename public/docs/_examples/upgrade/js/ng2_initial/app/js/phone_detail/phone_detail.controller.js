// #docregion
'use strict';

angular.module('phonecat.detail')
  .controller('PhoneDetailCtrl', PhoneDetailCtrl);


PhoneDetailCtrl.$inject = ['$routeParams', 'phones'];

function PhoneDetailCtrl($routeParams, phones) {
  var ctrl = this;

  phones.get($routeParams.phoneId).subscribe(function(phone) {
    ctrl.phone = phone;
    ctrl.mainImageUrl = phone.images[0];
  });

  ctrl.setImage = function(imageUrl) {
    ctrl.mainImageUrl = imageUrl;
  };
}
