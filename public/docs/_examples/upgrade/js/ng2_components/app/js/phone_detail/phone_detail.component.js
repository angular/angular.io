(function(app) {
  'use strict';

  app.PhoneDetail = function PhoneDetail(phones, $routeParams) {
    var self = this;
    phones.get($routeParams.phoneId).subscribe(function(phone) {
      self.phone = phone;
      self.mainImageUrl = phone.images[0];
    });
    self.setImage = function(imageUrl) {
      self.mainImageUrl = imageUrl;
    };
  }
  app.PhoneDetail.parameters = [app.Phones, '$routeParams'];
  // #docregion componentmetadata
  app.PhoneDetail.annotations = [
    new ng.core.ComponentMetadata({
      selector: 'phone-detail',
      templateUrl: 'js/phone_detail/phone_detail.html',
      pipes: [app.CheckmarkPipe]
    })
  ];
  // #enddocregion componentmetadata

  // #docregion register
  angular.module('phonecat.detail')
    .directive('phoneDetail', app.upgradeAdapter.downgradeNg2Component(app.PhoneDetail));
  // #enddocregion register

})(window.app || (window.app = {}));
