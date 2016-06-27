/*
 * Resources Controller
 *
 * This controller is responsible for fetching all the data for the resources page,
 * from Firebase.
 */
angularIO.controller('ResourcesCtrl', ['$scope', '$element', '$window', '$firebaseArray', '$firebaseObject','$location', function ($scope, $window, $element, $firebaseArray, $firebaseObject, $location) {
  var DEFAULT_CATEGORY = 'education';
  var categoryRef = new Firebase("https://angularresources.firebaseio.com/");
  var vm = this;

  vm.fbObject = $firebaseObject(categoryRef);
  vm.selectedCategory = $location.hash() ? $location.hash() : DEFAULT_CATEGORY;

  // TODO: Implement handler for scroll behaviour
  vm.scrollPos = 0;

  window.onscroll = function() {
    vm.scrollPos = document.body.scrollTop || document.documentElement.scrollTop || 0;
    $scope.$apply();
  };

  // onSelect :: String
  // Side effect, modifies vm.selectedCategory
  vm.onSelectCategory = function onSelectCategory(category) {
    $location.hash(category);
    vm.selectedCategory = category;
  };

}]);