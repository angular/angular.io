/*eslint no-unused-vars: "angularIO" */


/*
* API List & Filter Directive
*
* A page displaying all of the angular API methods available
* including a filter that can hide/show methods bases on filter
* settings.
*/

angularIO.directive('apiList', function () {
  var QUERY_KEY = 'query';
  var TYPE_KEY = 'type';
  var STATUS_KEY = 'status';

  return {
    restrict: 'E',
    template:
      '<div ng-cloak="ng-cloak" class="l-flex-wrap banner is-plain api-filter">' +
      '  <div class="form-select-menu">' +
      '    <button ng-repeat="type in $ctrl.types" ng-if="$ctrl.type === type.matches[0]" class="form-select-button has-symbol" ng-click="$ctrl.toggleMenu(\'type\')"><strong>Type:</strong><span class="symbol {{type.cssClass}}" ng-if="type.cssClass !== \'stable\'" ></span>{{type.title}}</button>'+
      '    <button class="form-select-button is-default" ng-if="$ctrl.type === null" ng-click="$ctrl.toggleMenu(\'type\')"><strong>Type: All</strong></button>'+
      '    <ul class="form-select-dropdown" ng-class="{ visible: $ctrl.showTypeMenu === true }">' +
      '      <li ng-class="{ active: !$ctrl.type }" ng-click="$ctrl.clear(\'type\')">All</li>' +
      '      <li ng-repeat="type in $ctrl.types" ng-class="{ active: $ctrl.type === type }" ng-click="$ctrl.set(type, \'type\')"><span class="symbol {{type.cssClass}}"></span>{{type.title}}</li>' +
      '    </ul>' +
      '    <div class="overlay" ng-class="{ visible: $ctrl.showTypeMenu === true }" ng-click="$ctrl.toggleMenu(\'type\')"></div>' +
      '  </div>' +
      '        ' +
      '  <div class="form-select-menu" ng-if="!$ctrl.isForDart">' +
      '    <button ng-repeat="status in $ctrl.statuses" ng-if="$ctrl.status === status.matches[0]" class="form-select-button" ng-click="$ctrl.toggleMenu(\'status\')"><strong>Status:</strong>{{status.title}}</button>'+
      '    <button class="form-select-button is-default" ng-if="$ctrl.status === null" ng-click="$ctrl.toggleMenu(\'status\')"><strong>Status: All</strong></button>'+
      '    <ul class="form-select-dropdown" ng-class="{ visible: $ctrl.showStatusMenu === true }">' +
      '      <li ng-class="{ active: !$ctrl.status }" ng-click="$ctrl.clear(\'status\')">All</li>' +
      '      <li ng-repeat="status in $ctrl.statuses" ng-class="{ active: $ctrl.status === status }" ng-click="$ctrl.set(status, \'status\')">{{status.title}}</li>' +
      '    </ul>' +
      '    <div class="overlay" ng-class="{ visible: $ctrl.showStatusMenu === true }" ng-click="$ctrl.toggleMenu(\'status\')"></div>' +
      '  </div>' +
      '        ' +
      '  <div class="form-search">' +
      '    <i class="material-icons">search</i>' +
      '    <input placeholder="Filter" ng-model="$ctrl.query" ng-model-options="{updateOn: \'default blur\', debounce: {\'default\': 350, \'blur\': 0}}">' +
      '  </div>' +
      '</div>' +
      '      ' +
      '<article class="l-content-small docs-content">' +
      '  <div ng-repeat="section in $ctrl.groupedSections" ng-if="$ctrl.filterSections(section)" ng-cloak="ng-cloak">' +
      '    <h2>{{ section.title }}</h2>' +
      '    <ul class="api-list">' +
      '      <li ng-repeat="item in section.items" ng-show="item.show" class="api-item">' +
      '        <a ng-href="{{ item.path }}"><span class="symbol {{ item.docType }}"></span>{{ item.title }}</a>' +
      '      </li>' +
      '    </ul>' +
      '  </div>' +
      '</article>',
    controllerAs: '$ctrl',
    controller: function($scope, $attrs, $http, $location) {
      // DEFAULT VALUES
      var $ctrl = this;
      $ctrl.showTypeMenu = false;
      $ctrl.showStatusMenu = false;
      $ctrl.status = null;
      $ctrl.query = null;
      $ctrl.type = null;
      $ctrl.groupedSections = [];


      // API TYPES
      $ctrl.types = [
        { cssClass: 'directive', title: 'Directive', matches: ['directive'] },
        { cssClass: 'pipe', title: 'Pipe', matches: ['pipe'] },
        { cssClass: 'decorator', title: 'Decorator', matches: ['decorator'] },
        { cssClass: 'class', title: 'Class', matches: ['class'] },
        { cssClass: 'interface', title: 'Interface', matches: ['interface'] },
        { cssClass: 'function', title: 'Function', matches: ['function'] },
        { cssClass: 'enum', title: 'Enum', matches: ['enum'] },
        { cssClass: 'type-alias', title: 'Type Alias', matches: ['type-alias'] },
        { cssClass: 'const', title: 'Const', matches: ['const', 'var', 'let'] }
      ];

      // STATUSES
      $ctrl.statuses = [
        { cssClass: 'stable', title: 'Stable', matches: ['stable']},
        { cssClass: 'deprecated', title: 'Deprecated', matches: ['deprecated']},
        { cssClass: 'experimental', title: 'Experimental', matches: ['experimental']},
        { cssClass: 'security', title: 'Security Risk', matches: ['security']}
      ];


      // SET FILTER VALUES
      getFilterValues();


      // GRAB DATA FOR SECTIONS
      $http.get($attrs.src).then(function(response) {
        $ctrl.sections =  response.data;

        $ctrl.groupedSections = Object.keys($ctrl.sections).map(function(title) {
          return { title: title, items: $ctrl.sections[title] };
        });
      });


      // SET SELECTED VALUE FROM MENUS/FORM
      $ctrl.set = function(item, kind) {
        var value = (item && item.matches) ? item.matches[0] : null;

        switch(kind) {
          case 'type': $ctrl.type = value ; break;
          case 'query': $ctrl.query = value ; break;
          case 'status': $ctrl.status = value ; break;
        }

        $ctrl.toggleMenu(kind);
      }


      // CLEAR SELECTED VALUE FROM MENUS/FORM
      $ctrl.clear = function (kind) {
        switch(kind) {
          case 'type': $ctrl.type = null ; break;
          case 'query': $ctrl.query = null ; break;
          case 'status': $ctrl.status = null ; break;
        }

        $ctrl.toggleMenu(kind);
      };


      // TOGGLE MENU
      $ctrl.toggleMenu = function(kind) {
        switch(kind) {
          case 'type': $ctrl.showTypeMenu = !$ctrl.showTypeMenu; ; break;
          case 'status': $ctrl.showStatusMenu = !$ctrl.showStatusMenu; ; break;
        }
      }


      // UPDATE VALUES IF DART API
      var isForDart = $attrs.lang === 'dart';
      if (isForDart) {
        $ctrl.isForDart = true;
        $ctrl.statuses = [];
        $ctrl.types = $ctrl.types.filter(function (t) {
          return t.cssClass.match(/^(class|function|const)$/);
        });
      }


      // SET URL WITH VALUES
      $scope.$watchGroup(
        [
          function() { return $ctrl.query; },
          function() { return $ctrl.type; },
          function() { return $ctrl.status; },
          function() { return $ctrl.sections; }
        ],

        function() {
          var queryURL = $ctrl.query ? $ctrl.query.toLowerCase() : null;
          var typeURL = $ctrl.type || null;
          var statusURL = $ctrl.status || null;

          // SET URLS
          $location.search(QUERY_KEY, queryURL);
          $location.search(STATUS_KEY, statusURL);
          $location.search(TYPE_KEY, typeURL);
        }
      );


      // GET VALUES FROM URL
      function getFilterValues() {
        var urlParams =  $location.search();

        $ctrl.status = urlParams[STATUS_KEY] || null;
        $ctrl.query = urlParams[QUERY_KEY] || null;;
        $ctrl.type = urlParams[TYPE_KEY] || null;;
      }


      // CHECK IF IT'S A CONSTANT TYPE
      function isConst(item) {
        var isConst = false;

        switch(item.docType) {
          case 'let': isConst = true; break;
          case 'var': isConst = true; break;
          case 'const': isConst = true; break;
          default: isConst = false;
        }

        return isConst;
      }

      // FILTER SECTION & ITEMS LOOP
      $ctrl.filterSections = function(section) {
        var showSection = false;

        section.items.forEach(function(item) {
          item.show = false;

          // CHECK IF TYPE IS NULL & STATUS, QUERY
          if (($ctrl.type === null) && statusSelected(item) && queryEntered(section, item)) {
            item.show = true;
          }

          // CHECK IF TYPE IS SELECTED & STATUS, QUERY
          if (($ctrl.type === item.docType) && statusSelected(item) && queryEntered(section, item)) {
            item.show = true;
          }

          // CHECK IF TYPE IS CONST & STATUS, QUERY
          if (($ctrl.type === 'const') && isConst(item) && statusSelected(item) && queryEntered(section, item)) {
            item.show = true;
          }

          // SHOW SECTION IF ONE ITEM IS VISIBLE
          if(!showSection && item.show) {
            showSection = true;
          }
        });

        return showSection;
      }


      // CHECK FOR QUERY
      function queryEntered(section, item) {
        var isVisible = false;

        // CHECK IF QUERY MATCH SECTION OR ITEM
        var query = ($ctrl.query || '').toLowerCase();
        var matchesSection = $ctrl.query === '' || $ctrl.query === null || section.title.toLowerCase().indexOf($ctrl.query.toLowerCase()) !== -1;
        var matchesTitle = !query || item.title.toLowerCase().indexOf(query) !== -1;

        // FILTER BY QUERY
        if(matchesTitle || matchesSection) {
          isVisible = true;
        }

        return isVisible;
      }


      // CHECK IF AN API ITEM IS VISIBLE BY STATUS
      function statusSelected(item) {
        var status = item.stability;
        var insecure = item.secure === 'false' ? false : true;
        var isVisible = false;

        if($ctrl.status === null) {
          isVisible = true;
        }

        if(status === $ctrl.status) {
          isVisible = true;
        }

        if(($ctrl.status === 'security') && insecure) {
          isVisible = true;
        }

        return isVisible;
      };
    }
  };
});
