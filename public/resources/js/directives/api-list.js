angularIO.directive('apiList', function () {
  return {
    restrict: 'E',
    template:
      '<div ng-cloak="ng-cloak" class="banner">' +
      '  <dl class="api-key">' +
      '    <dt>Display:</dt>' +
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
    controller: function($scope, $attrs, $http) {
      var $ctrl = this;

      $ctrl.apiType     = null;
      $ctrl.apiFilter   = '';
      $ctrl.filteredSections = [];

      $ctrl.setType = function (type) {
        if (type === $ctrl.apiType) $ctrl.apiType = null;
        else $ctrl.apiType = type;
      };

      $http.get($attrs.src).then(function(response) {
        $ctrl.sections = response.data;
      });

      $ctrl.apiTypes = [
        { cssClass: 'directive', title: 'Directive', matches: ['directive'] },
        { cssClass: 'class', title: 'Class', matches: ['class'] },
        { cssClass: 'interface', title: 'Interface', matches: ['interface'] },
        { cssClass: 'function', title: 'function', matches: ['function'] },
        { cssClass: 'const', title: 'Const or Enum', matches: ['const', 'enum'] },
        { cssClass: 'var', title: 'Variable', matches: ['var', 'let'] }
      ];

      $scope.$watchGroup(
        [function() { return $ctrl.apiFilter}, function() { return $ctrl.apiType; }, function() { return $ctrl.sections; }],
        function(filter, type, sections) {
          $ctrl.filteredSections.length = 0;
          angular.forEach($ctrl.sections, function(section, title) {
            var matchesModule = $ctrl.apiFilter == '' || title.toLowerCase().indexOf($ctrl.apiFilter.toLowerCase()) !== -1;
            var filteredItems = section.filter(function(item) {
              var matchesDocType = !$ctrl.apiType || $ctrl.apiType.matches.indexOf(item.docType) !== -1;
              var matchesTitle = $ctrl.apiFilter == '' || item.title.toLowerCase().indexOf($ctrl.apiFilter.toLowerCase()) !== -1;
              return matchesDocType && (matchesTitle || matchesModule);
            });
            if (filteredItems.length) {
              $ctrl.filteredSections.push({ title: title, items: filteredItems });
            }
          });
        }
      );
    }
  };
});