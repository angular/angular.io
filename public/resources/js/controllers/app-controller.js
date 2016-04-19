/*
 * Application Controller
 *
 */

angularIO.controller('AppCtrl', ['$mdDialog', '$timeout', '$http', '$sce', function ($mdDialog, $timeout, $http, $sce) {
  var vm = this;

  vm.showDocsNav = false;
  vm.showMainNav = false;
  vm.showMenu    = false;

  // TOGGLE MAIN NAV (TOP) ON MOBILE
  vm.toggleDocsMenu = function () {
    vm.showDocsNav = !vm.showDocsNav;
  };

  // TOGGLE DOCS NAV
  vm.toggleMainMenu = function () {
    vm.showMainNav = !vm.showMainNav;
  };

  // TOGGLE DOCS VERSION & LANGUAGE
  vm.toggleVersionMenu = function () {
    vm.showMenu = !vm.showMenu;
  };

  vm.openFeedback = function() {
    var configuration = {
      'productId': '410509',
      'authuser': '1',
      'bucket': 'angulario'
    };
    userfeedback.api.startFeedback(configuration);
  };

  // URL hash keeps track of which method the user wants to view in the API doc.
  // Refer to _api.scss (.anchor-focused) and class.template.html (where ng-class is used) for details.
  vm.isApiDocMemberFocused = function(memberName) {
    var apiDocFocusedMember = window.location.hash.replace('#!#', '').replace('-anchor', '');
    return apiDocFocusedMember === memberName;
  };

  /*
   * Prettify Code
   *
   * Finish Rendereding code directives then prettify code
   */

  // GRAB ALL TAGS NOT USING DIRECTIVES
  var preTags = angular.element(document.body).find('pre');

  // LOOP THROUGH AND ADD PRETTIFY CLASS
  _.each(preTags, function (element) {
    var preTag = angular.element(element);

    // IF NOT FORMATTED, ADD PRETTY PRINT
    if (!preTag.hasClass('prettyprint')) {
      preTag.addClass('prettyprint linenums');
    }
  });

  // TRIGGER PRETTYPRINT AFTER DIGEST LOOP COMPLETE
  $timeout(prettyPrint, 1);
} ]);