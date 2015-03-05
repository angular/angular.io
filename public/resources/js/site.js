var angularIO = angular.module('angularIOApp', ['ngMaterial'])
.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('blue', {
      'default': '700', // by default use shade 400 from the pink palette for primary intentions
      'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
      'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
      'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
    })
    // If you specify less than all of the keys, it will inherit from the
    // default shades
    .accentPalette('purple', {
      'default': '200' // use shade 200 for default, and keep all other shades the same
    });
});


/*
* Apllication Controller
*
*/

angularIO.controller('AppCtrl', ['$scope', '$mdDialog', function($scope, $mdDialog){

  // TOGGLE MAIN NAV (TOP) ON MOBILE
  $scope.toggleMainMenu = function(event) {
    $scope.showMainNav = !$scope.showMainNav;
  };


  // TOGGLE DOCS VERSION & LANGUAGE
  $scope.toggleVersionMenu = function(event) {
    $scope.showMenu = !$scope.showMenu;
  };


  // SHOW FULL ABOUT US PAGE BIO
  $scope.showBio = function (event) {
    var bio = angular.element(event.currentTarget).text();
    console.log(bio);

    $mdDialog.show(
      $mdDialog.alert()
        .title('Full Bio')
        .content(bio)
        .ariaLabel('Biography')
        .ok('Close Bio')
        .targetEvent(event)
    );
  };

  prettyPrint();
}]);


