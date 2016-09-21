angularIO.directive('apiList', function () {
  var API_FILTER_KEY = 'apiFilter';
  var API_TYPE_KEY = 'apiType';
  return {
    restrict: 'E',
    template:
      '<div ng-cloak="ng-cloak" class="banner is-plain api-filter clearfix">' +
      '  <div class="form-select-menu">' +
      '    <button ng-repeat="apiType in $ctrl.apiTypes" ng-if="$ctrl.apiType === apiType" class="form-select-button has-symbol" ng-click="$ctrl.toggleMenu()"><strong>Type:</strong><span class="symbol {{apiType.cssClass}}" ng-if="apiType.cssClass !== \'stable\'" ></span>{{apiType.title}}</button>'+
      '    <button class="form-select-button is-default" ng-if="$ctrl.apiType === null" ng-click="$ctrl.toggleMenu()"><strong>All Types</strong></button>'+
      '    <ul class="form-select-dropdown" ng-class="{ visible: $ctrl.showMenu === true }">' +
      '      <li ng-class="{ active: !$ctrl.apiType }" ng-click="$ctrl.clearType()">All Types</li>' +
      '      <li ng-repeat="apiType in $ctrl.apiTypes" ng-class="{ active: $ctrl.apiType === apiType }" ng-click="$ctrl.setType(apiType)"><span class="symbol {{apiType.cssClass}}"></span>{{apiType.title}}</li>' +
      '    </ul>' +
      '    <div class="overlay" ng-class="{ visible: $ctrl.showMenu === true }" ng-click="$ctrl.toggleMenu()"></div>' +
      '  </div>' +
      '  <div class="form-search">' +
      '    <i class="material-icons">search</i>' +
      '    <input placeholder="Filter" ng-model="$ctrl.apiFilter" ng-model-options="{updateOn: \'default blur\', debounce: {\'default\': 350, \'blur\': 0}}">' +
      '  </div>' +
      '</div>' +
      '<article class="l-content-small grid-fluid docs-content">' +
      '  <div ng-repeat="section in $ctrl.groupedSections" ng-if="$ctrl.isFiltered(section)" ng-cloak="ng-cloak">' +
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
      var $ctrl = this;

      $ctrl.showMenu = false;

      var isForDart = $attrs.lang === 'dart';

      $ctrl.apiTypes = [
        { cssClass: 'stable', title: 'Only Stable', matches: ['stable']},
        { cssClass: 'directive', title: 'Directive', matches: ['directive'] },
        { cssClass: 'pipe', title: 'Pipe', matches: ['pipe'] },
        { cssClass: 'decorator', title: 'Decorator', matches: ['decorator'] },
        { cssClass: 'class', title: 'Class', matches: ['class'] },
        { cssClass: 'interface', title: 'Interface', matches: ['interface'] },
        { cssClass: 'function', title: 'Function', matches: ['function'] },
        { cssClass: 'enum', title: 'Enum', matches: ['enum'] },
        { cssClass: 'const', title: 'Const', matches: ['var', 'let', 'const'] }
      ];

      if (isForDart) $ctrl.apiTypes = $ctrl.apiTypes.filter(function (t) {
        return !t.cssClass.match(/^(stable|directive|decorator|interface|enum)$/);
      });

      $ctrl.apiFilter = getApiFilterFromLocation();
      $ctrl.apiType = getApiTypeFromLocation();
      $ctrl.groupedSections = [];

      $ctrl.setType = function (type) {
        if (type === $ctrl.apiType) $ctrl.apiType = null;
        else $ctrl.apiType = type;
        $ctrl.showMenu = !$ctrl.showMenu;
      };

      $ctrl.clearType = function () {
        $ctrl.apiType = null;
        $ctrl.showMenu = !$ctrl.showMenu;
      };

      $ctrl.toggleMenu = function () {
        $ctrl.showMenu = !$ctrl.showMenu;
      };

      $ctrl.isFiltered = function(section) {
        var apiFilter = ($ctrl.apiFilter || '').toLowerCase();
        var matchesModule = $ctrl.apiFilter === '' || $ctrl.apiFilter === null || section.title.toLowerCase().indexOf($ctrl.apiFilter.toLowerCase()) !== -1;
        var isVisible = false;

        section.items.forEach(function(item) {

          // Filter by stability (ericjim: only 'stable' for now)
          if ($ctrl.apiType && $ctrl.apiType.matches.length === 1 &&
              $ctrl.apiType.matches[0] === 'stable' && item.stability === 'stable') {
            item.show = true;
            isVisible = true;
            return isVisible;
          }  // NOTE: other checks can be performed for stability (experimental, deprecated, etc)

          // Filter by docType
          var matchesDocType = !$ctrl.apiType || $ctrl.apiType.matches.indexOf(item.docType) !== -1;
          var matchesTitle = !apiFilter || item.title.toLowerCase().indexOf(apiFilter) !== -1;
          item.show = matchesDocType && (matchesTitle || matchesModule);

          if (item.show) {
            isVisible = true;
          }
        });

        return isVisible;
      };

      $http.get($attrs.src).then(function(response) {
        $ctrl.sections = response.data;
        $ctrl.groupedSections = Object.keys($ctrl.sections).map(function(title) {
          return { title: title, items: $ctrl.sections[title] };
        });
      });

      $scope.$watchGroup(
        [function() { return $ctrl.apiFilter; }, function() { return $ctrl.apiType; }, function() { return $ctrl.sections; }],
        function() {
          var apiFilter = ($ctrl.apiFilter || '').toLowerCase();

          $location.search(API_FILTER_KEY, apiFilter || null);
          $location.search(API_TYPE_KEY, $ctrl.apiType && $ctrl.apiType.title || null);
        }
      );

      function getApiFilterFromLocation() {
        return $location.search()[API_FILTER_KEY] || null;
      }

      function getApiTypeFromLocation() {
        var apiFilter = $location.search()[API_TYPE_KEY];
        if (!apiFilter) {
          return null;
        } else if (!$ctrl.apiFilter || $ctrl.apiFilter.title != apiFilter) {
          for (var i = 0, ii = $ctrl.apiTypes.length; i < ii; i++) {
            if ($ctrl.apiTypes[i].title == apiFilter) {
              return $ctrl.apiTypes[i];
            }
          }
        }
        // If we get here then the apiType query didn't match any apiTypes
        $location.search(API_TYPE_KEY, null);
      }
    }
  };
});