// #docregion
PhoneDetailCtrl.$inject = ['$routeParams', 'Phone'];

function PhoneDetailCtrl($routeParams, Phone) {
  var vm = this;
  vm.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
    vm.mainImageUrl = phone.images[0];
  });
  vm.setImage = function(imageUrl) {
    vm.mainImageUrl = imageUrl;
  };
}

export default PhoneDetailCtrl;
