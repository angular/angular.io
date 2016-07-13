/*
 * Resources Controller
 *
 * This controller is responsible for fetching all the data for the resources page,
 * from Firebase.
 */
angularIO.controller('ResourcesCtrl', ['$scope', '$element', '$window', '$firebaseArray', '$firebaseObject','$location', function ($scope, $window, $element, $firebaseArray, $firebaseObject, $location) {
  var DEFAULT_CATEGORY = 'education';
  var categoryRef = new Firebase("https://project-8263071350145382327.firebaseio.com/");

  // TODO: (ericjim): we need the database
  var devRef = new Firebase("https://project-8263071350145382327.firebaseio.com/Development");
  devRef.setPriority(1000);

  var eduRef = new Firebase("https://project-8263071350145382327.firebaseio.com/Education");
  eduRef.setPriority(2000);

  var communityRef = new Firebase("https://project-8263071350145382327.firebaseio.com/Community");
  communityRef.setPriority(3000);


  var vm = this;

  vm.fbObject = $firebaseObject(categoryRef);
  vm.selectedCategory = $location.hash() ? $location.hash() : DEFAULT_CATEGORY;

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

angularIO.filter('orderObjectByOfTypeString', function() {
  return function(items, field, reverse) {
    var filtered = [];
    angular.forEach(items, function(item) {
      filtered.push(item);
    });
    filtered.sort(function (a, b) {
      // normalize sort by uppercasing values.
      return (a[field].toUpperCase() > b[field].toUpperCase() ? 1 : -1);
    });
    if(reverse) filtered.reverse();
    return filtered;
  };
});
