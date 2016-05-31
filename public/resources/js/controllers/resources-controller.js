/*
 * Resources Controller
 *
 * This controller is responsible for fetching all the data for the resources page,
 * from Firebase.
 */
angularIO.controller('ResourcesCtrl', ['$firebaseArray', '$firebaseObject','$location', function ($firebaseArray, $firebaseObject, $location) {
  var DEFAULT_CATEGORY = 'education';
  var categoryRef = new Firebase("https://angularresources.firebaseio.com/");
  var vm = this;

  vm.fbObject = $firebaseObject(categoryRef);
  vm.selectedCategory = $location.hash() ? $location.hash() : DEFAULT_CATEGORY;

  // onSelect :: String
  // Side effect, modifies vm.selectedCategory
  vm.onSelectCategory = function onSelectCategory(category) {
    $location.hash(category);
    vm.selectedCategory = category;
  };

}]);