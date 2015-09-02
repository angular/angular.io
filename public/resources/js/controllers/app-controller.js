/*
* Apllication Controller
*
*/

angularIO.controller('AppCtrl', ['$mdDialog', '$timeout', function($mdDialog, $timeout) {
  var vm = this;

  vm.showDocsNav = false;
  vm.showMainNav = false;
  vm.showMenu = false;

  // TOGGLE MAIN NAV (TOP) ON MOBILE
  vm.toggleDocsMenu = function() {
    vm.showDocsNav = !vm.showDocsNav;
  };

  // TOGGLE DOCS NAV
  vm.toggleMainMenu = function() {
    vm.showMainNav = !vm.showMainNav;
  };

  // TOGGLE DOCS VERSION & LANGUAGE
  vm.toggleVersionMenu = function() {
    vm.showMenu = !vm.showMenu;
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
      preTag.addClass('prettyprint linenums');
    }
  });

  // TRIGGER PRETTYPRINT AFTER DIGEST LOOP COMPLETE
  $timeout(prettyPrint, 1);
}]);