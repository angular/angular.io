(function(app) {
  'use strict';

  // #docregion routeparams
  app.PhoneDetail = function PhoneDetail(phones, routeParams) {
    var self = this;
    phones.get(routeParams.get('phoneId')).subscribe(function(phone) {
      self.phone = phone;
      self.mainImageUrl = phone.images[0];
    });
    self.setImage = function(imageUrl) {
      self.mainImageUrl = imageUrl;
    };
  }
  app.PhoneDetail.parameters = [app.Phones, ng.router.RouteParams];
  // #enddocregion routeparams
  app.PhoneDetail.annotations = [
    new ng.core.ComponentMetadata({
      selector: 'phone-detail',
      templateUrl: 'js/phone_detail/phone_detail.html',
      pipes: [app.CheckmarkPipe]
    })
  ];

})(window.app || (window.app = {}));
