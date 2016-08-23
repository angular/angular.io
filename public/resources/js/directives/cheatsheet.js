angularIO.directive('ngioCheatsheet', function() {
  return {
    controllerAs: '$ctrl',
    controller: function($http, $attrs, $sce) {
      var $ctrl = this;
      $http.get($attrs.src).then(function(response) {
        $ctrl.currentEnvironment = response.data.currentEnvironment;
        $ctrl.version = response.data.version;
        $ctrl.sections = response.data.sections;
      });
      $ctrl.getSafeHtml = function(html) {
        return $sce.trustAsHtml(html);
      };
    },
    template:
      '<h2>Angular for {{$ctrl.currentEnvironment}} Cheat Sheet (v{{ $ctrl.version.raw }})</h2>' +
      '<br>' +
      '<div ng-if="!$ctrl.sections">Loading Cheatsheet...</div>\n' +
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