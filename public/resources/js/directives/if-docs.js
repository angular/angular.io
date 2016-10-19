/*
* Angular.io Example Conditional Directive
*
* Usage:
*   <tag if-docs="ts|dart">...</tag>
*
* This is equivalent to an ngIf that holds if this containing
* docs are for TypeScript.
*/

angularIO.directive('ifDocs', ['ngIfDirective', '$location', function (ngIfDirective, $location) {
  var ngIf = ngIfDirective[0];

  return {
    transclude: ngIf.transclude,
    priority: ngIf.priority,
    terminal: ngIf.terminal,
    restrict: ngIf.restrict,
    link: function (scope, element, attrs) {
      var ngIfCond =  (attrs.ifDocs === 'dart') == !NgIoUtil.isDoc($location, 'dart');
      attrs.ngIf = function () { return !ngIfCond; }
      ngIf.link.apply(ngIf, arguments);
    }
  };
}]);