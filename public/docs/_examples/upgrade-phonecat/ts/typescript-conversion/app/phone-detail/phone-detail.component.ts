// #docregion

export default {
  templateUrl: 'phone-detail/phone-detail.template.html',
  controller: ['$routeParams', 'Phone',
    function PhoneDetailController($routeParams, Phone) {
      var vm = this;
      vm.phone = Phone.get({phoneId: $routeParams.phoneId}, (phone) => {
        vm.setImage(phone.images[0]);
      });
      vm.setImage = function setImage(imageUrl) {
        vm.mainImageUrl = imageUrl;
      };
    }
  ]
};
