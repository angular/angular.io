// #docregion
PhoneListCtrl.$inject = ['Phone'];

function PhoneListCtrl(Phone) {
  var vm = this;
  vm.phones = Phone.query();
  vm.orderProp = 'age';
}

export default PhoneListCtrl;
