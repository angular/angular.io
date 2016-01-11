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
      '  <input placeholder="Filter" ng-model="$ctrl.apiFilter" class="api-filter">' +
      '</div>' +
      '<article class="l-content-small grid-fluid docs-content">' +
      '  <div ng-repeat="section in $ctrl.filteredSections" ng-cloak="ng-cloak">' +
      '    <h3>{{ section.title }}</h3>' +
      '    <ul class="api-list">' +
      '      <li ng-repeat="item in section.items" class="api-item">' +
      '        <a ng-href="{{ item.path }}"><span class="symbol {{ item.docType }}"></span>{{ item.title }}</a>' +
      '      </li>' +
      '    </ul>' +
      '  </div>' +
      '</article>',
    controllerAs: '$ctrl',
    controller: function($scope, $attrs, $http, $location) {
      var $ctrl = this;

      $ctrl.apiTypes = [
        { cssClass: 'directive', title: 'Directive', matches: ['directive'] },
        { cssClass: 'decorator', title: 'Decorator', matches: ['decorator'] },
        { cssClass: 'class', title: 'Class', matches: ['class'] },
        { cssClass: 'interface', title: 'Interface', matches: ['interface'] },
        { cssClass: 'function', title: 'Function', matches: ['function'] },
        { cssClass: 'const', title: 'Const or Enum', matches: ['const', 'enum'] },
        { cssClass: 'var', title: 'Variable', matches: ['var', 'let'] }
      ];

      $ctrl.apiFilter = getApiFilterFromLocation();
      $ctrl.apiType = getApiTypeFromLocation();
      $ctrl.filteredSections = [];

      $ctrl.setType = function (type) {
        if (type === $ctrl.apiType) $ctrl.apiType = null;
        else $ctrl.apiType = type;
      };

      $http.get($attrs.src).then(function(response) {
        $ctrl.sections = response.data;
      });

      $scope.$watchGroup(
        [function() { return $ctrl.apiFilter}, function() { return $ctrl.apiType; }, function() { return $ctrl.sections; }],
        function() {
          var apiFilter = ($ctrl.apiFilter || '').toLowerCase();

          $location.search(API_FILTER_KEY, apiFilter || null);
          $location.search(API_TYPE_KEY, $ctrl.apiType && $ctrl.apiType.title || null);

          $ctrl.filteredSections.length = 0;
          angular.forEach($ctrl.sections, function(section, title) {
            var matchesModule = $ctrl.apiFilter === '' || $ctrl.apiFilter === null || title.toLowerCase().indexOf($ctrl.apiFilter.toLowerCase()) !== -1;
            var filteredItems = section.filter(function(item) {
              var matchesDocType = !$ctrl.apiType || $ctrl.apiType.matches.indexOf(item.docType) !== -1;
              var matchesTitle = !apiFilter || item.title.toLowerCase().indexOf(apiFilter) !== -1;
              return matchesDocType && (matchesTitle || matchesModule);
            });
            if (filteredItems.length) {
              $ctrl.filteredSections.push({ title: title, items: filteredItems });
            }
          });
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
          for(var i = 0, ii = $ctrl.apiTypes.length; i < ii; i++) {
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