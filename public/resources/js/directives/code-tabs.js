/*
* Code Tabs Directive
*
* Creates a tabs code examples that
* displayed in the same container
*/

angularIO.directive('codeTabs', function($timeout) {
  return {
    restrict: 'E',
    scope: {},
    transclude: true,
    replace: true,

    controller: function ($scope) {
      $scope.panes = [];


      /*
      * Add Code Pane List of Panes
      *
      */

      this.addPane = function(pane) {
        if ($scope.panes.length === 0) {
          $scope.showPane(pane);
        }

        $scope.panes.push(pane);
      };


      /*
      * Show selected Code Examples
      *
      */

      $scope.showPane = function(pane) {
        // RESET ALL EXAMPLES
        angular.forEach($scope.panes, function(pane) {
          pane.selected = false;
        });

        // SELECT CURRENT EXAMPLE
        pane.selected = true;
      };


      /*
      * Finish Rendereding then prettify code
      *
      */

      $scope.$watch($scope.panes.$last,function(){
        $timeout(prettyPrint, 1);
      });
    },

    template:
      '<div class="code-box">' +
      ' <header class="code-box-header">' +
      '   <nav class="code-box-nav">' +
      '    <button ng-repeat="pane in panes" ng-click="showPane(pane)" class="button" ng-class="{selected:pane.selected}">' +
      '      {{pane.name}}' +
      '    </button>' +
      '   </nav>' +
      ' </header>' +
      ' <div class="code-box-examples" ng-transclude></div>' +
      '</div>'
  };
});