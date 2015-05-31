/*
 * Apllication Controller
 *
 */

angularIO.directive('bold', function ($timeout) {
  return {
    scope: { bold: '=bold' },
    link:  postLink
  };
  function postLink (scope, element) {
    var bold = typeof scope.bold === 'string'
        ? [ scope.bold ]
        : scope.bold;
    $timeout(function () {
      var html = element.html();
      angular.forEach(bold, function (bold) {
        html = html.replace(new RegExp(bold.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1"), 'g'), '<b>$&</b>');
      });
      html = html.replace(/\n/g, '<br>');
      html = html.replace(/ /g, '&nbsp;');
      element.html(html);
    });
  }
});

angularIO.controller('AppCtrl', ['$mdDialog', '$timeout', '$http', '$sce', function ($mdDialog, $timeout, $http, $sce) {
  var vm = this;

  $http.get('/resources/js/app-data.json').then(function(response) {
    vm.apiList = response.data;
  });

  $http.get('/resources/js/cheatsheet.json').then(function(response) {
    vm.cheatsheet = response.data;
  });

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

  vm.setType = function (type) {
    if (type === vm.apiType) vm.apiType = '';
    else vm.apiType = type;
  };

  vm.apiSections = [
    { name: 'angular2/core', title: 'Core' },
    { name: 'angular2/http', title: 'HTTP' },
    { name: 'angular2/lifecycle_hooks', title: 'Lifecycle Hooks' },
    { name: 'angular2/router', title: 'Router' },
    { name: 'angular2/test', title: 'Test' }
  ];
  vm.apiType     = '';
  vm.apiFilter   = '';

  vm.getSafeHtml = function(html) {
    return $sce.trustAsHtml(html);
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