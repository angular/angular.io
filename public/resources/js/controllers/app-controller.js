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
  
  vm.highlightSelectedLink = function highlightSelectedLink() {
    var leftNav = document.getElementsByClassName('side-nav-secondary')[0];
    if (!leftNav) {return;}
    var links = leftNav.getElementsByTagName('a');
    var path = location.toString();
    // remove trailing '/'
    if (path[path.length-1] === '/') {path = path.slice(0, path.length-1);}
    // remove trailing '/index.html' (11 chars) for matching purposes.
    if (path.lastIndexOf('/index.html') === path.length-11) {
      path = path.slice(0, -11);
    }
    for (var i=0; i < links.length; i++){
      // assumes fresh page each time so no need to clear class
      if (path === links[i].href) {
        var parent = links[i].parentElement;
        parent.classList.add('is-selected');

        if(parent.offsetTop > window.innerHeight && parent.scrollIntoView){
          parent.scrollIntoView(false);    
         // parent.scrollTop();
        }
        break;
      }
    }
  }
  vm.highlightSelectedLink();

  vm.openFeedback = function() {
    var configuration = {
      'productId': '410509',
      'authuser': '1',
      'bucket': 'angulario'
    };
    userfeedback.api.startFeedback(configuration);
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