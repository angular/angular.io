/*
* Apllication Controller
*
*/

angularIO.controller('AppCtrl', ['$scope', '$mdDialog', '$timeout', function($scope, $mdDialog, $timeout) {
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


  /*
  * Prettify Code
  *
  * Finish Rendereding code directives then prettify code
  */

  // GRAB ALL TAGS NOT USING DIRECTIVES
  var preTags = angular.element(document.body).find('pre');

  // LOOP THROUGH AND ADD PRETTIFY CLASS
  _.each(preTags, function(element) {
    var preTag = angular.element(element);

    // IF NOT FORMATTED, ADD PRETTY PRINT
    if(!preTag.hasClass('prettyprint')) {
      preTag.addClass('prettyprint linums');
    }
  });

  // TRIGGER PRETTYPRINT AFTER DIGEST LOOP COMPLETE
  $timeout(prettyPrint, 1);
}]);