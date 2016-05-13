/*
 * Resources Controller
 *
 * This controller is responsible for fetching all the data for the resources page,
 * from Firebase.
 */
angularIO.controller('ResourcesCtrl', ['$firebaseArray', '$firebaseObject', function ($firebaseArray, $firebaseObject) {
  var categoryRef = new Firebase("https://angularresources.firebaseio.com/");
  var vm = this;

  vm.fbObject = $firebaseObject(categoryRef);

}]);