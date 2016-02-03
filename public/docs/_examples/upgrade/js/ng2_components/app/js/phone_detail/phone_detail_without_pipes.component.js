// #docregion 
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
  app.PhoneDetail.annotations = [
    new ng.core.ComponentMetadata({
      selector: 'phone-detail',
      templateUrl: 'js/phone_detail/phone_detail.html'
    })
  ];

})(window.app || (window.app = {}));
