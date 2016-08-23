angularIO.directive('apiList', function () {
  var API_FILTER_KEY = 'apiFilter';
  var API_TYPE_KEY = 'apiType';
  return {
    restrict: 'E',
    template:
      '<div ng-cloak="ng-cloak" class="banner">' +
      '  <dl class="api-key">' +
      '    <dt>Display:</dt>' +
      '    <dd ng-class="{ active: !$ctrl.apiType }" ng-click="$ctrl.apiType = null">All</dd>' +
      '    <dd ng-repeat="apiType in $ctrl.apiTypes" ng-class="{ active: $ctrl.apiType === apiType }" ng-click="$ctrl.setType(apiType)" class="{{apiType.cssClass}}">{{apiType.title}}</dd>' +
      '  </dl>' +
      '  <input placeholder="Filter" ng-model="$ctrl.apiFilter" ng-model-options="{updateOn: \'default blur\', debounce: {\'default\': 350, \'blur\': 0}}" class="api-filter">' +
      '</div>' +
      '<article class="l-content-small grid-fluid docs-content">' +
      '  <div ng-repeat="section in $ctrl.groupedSections" ng-if="$ctrl.isFiltered(section)" ng-cloak="ng-cloak">' +
      '    <h3>{{ section.title }}</h3>' +
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

      var isForDart = $attrs.lang === 'dart';

      $ctrl.apiTypes = [
        { cssClass: 'stable', title: 'Stable', matches: ['stable']},
        { cssClass: 'directive', title: 'Directive', matches: ['directive'] },
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
        [function() { return $ctrl.apiFilter}, function() { return $ctrl.apiType; }, function() { return $ctrl.sections; }],
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