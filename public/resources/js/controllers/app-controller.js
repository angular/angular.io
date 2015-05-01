/*
* Apllication Controller
*
*/

angularIO.controller('AppCtrl', ['$scope', '$mdDialog', function($scope, $mdDialog){

  $scope.showDocsNav = false;
  $scope.showMainNav = false;
  $scope.showMenu = false;

  // TOGGLE MAIN NAV (TOP) ON MOBILE
  $scope.toggleDocsMenu = function(event) {
    event.preventDefault();
    $scope.showDocsNav = !$scope.showDocsNav;
  };

  // TOGGLE DOCS NAV
  $scope.toggleMainMenu = function(event) {
    event.preventDefault();
    $scope.showMainNav = !$scope.showMainNav;
  };

  // TOGGLE DOCS VERSION & LANGUAGE
  $scope.toggleVersionMenu = function(event) {
    event.preventDefault();
    $scope.showMenu = !$scope.showMenu;
  };

  // INITIALIZE PRETTY PRINT
  prettyPrint();
}]);