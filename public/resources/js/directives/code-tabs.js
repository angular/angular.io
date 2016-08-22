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
    controllerAs: 'vm',
    controller: function () {
      var vm = this;

      vm.panes = [];


      /*
      * Add Code Pane List of Panes
      *
      */

      this.addPane = function(pane) {
        if (vm.panes.length === 0) {
          vm.showPane(pane);
        }

        vm.panes.push(pane);
      };


      /*
      * Show selected Code Examples
      *
      */

      vm.showPane = function(pane) {
        // RESET ALL EXAMPLES
        angular.forEach(vm.panes, function(pane) {
          pane.selected = false;
        });

        // SELECT CURRENT EXAMPLE
        pane.selected = true;
      };
    },

    template:
      '<div class="code-box">' +
      ' <header class="code-box-header">' +
      '   <nav class="code-box-nav">' +
      '    <button ng-repeat="pane in vm.panes" ng-click="vm.showPane(pane)" class="button" ng-class="{selected:pane.selected}">' +
      '      {{pane.name}}' +
      '    </button>' +
      '   </nav>' +
      ' </header>' +
      ' <div class="code-box-examples" ng-transclude></div>' +
      '</div>'
  };
});