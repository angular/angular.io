angularIO.directive('ngioCheatsheet', function() {
  return {
    restrict: 'E',
    scope: {},
    controllerAs: '$ctrl',
    controller: function($http, $attrs, $sce) {
      var $ctrl = this;
      $http.get($attrs.src).then(function(response) {
        if ($attrs.hasOwnProperty('versionOnly')) {
          $ctrl.version = response.data.version.raw;
        } else {
          $ctrl.sections = response.data.sections;
        }
      });
      $ctrl.getSafeHtml = function(html) {
        return $sce.trustAsHtml(html);
      };
    },
    template:
      '<span ng-if="$ctrl.version">{{$ctrl.version}}</span>' +
      '<table ng-repeat="section in $ctrl.sections" ng-cloak>\n' +
      '<tr>\n' +
      '  <th>{{section.name}}</th>\n' +
      '  <th ng-bind-html="$ctrl.getSafeHtml(section.description)"></th>\n' +
      '</tr>\n' +
      '<tr ng-repeat="child in section.items">\n' +
      '  <td><code bold="child.bold" ng-compile="true">{{child.syntax}}</code></td>\n' +
      '  <td ng-bind-html="$ctrl.getSafeHtml(child.description)"></td>\n' +
      '</tr>\n' +
      '</table>'
  };
});