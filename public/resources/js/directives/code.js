/*
* Code Directive
* Don't compile the contents of `<code>` elements.
* This allows examples to contain angular syntax.
*
* But DO compile if the element also contains the `ng-compile` attribute
* E.g. `<code ng-compile>{{ 'do interpolate' + 'me' }}</code>`
*/

angularIO.directive('code', function($compile) {
  return {
    priority: 100,
    restrict: 'E',
    terminal: true,
    link: function($scope, $element, $attrs) {
      // If the element contains the `ng-compile` attribute then
      // go ahead and compile anyway
      if ($attrs.ngCompile) {
        $compile($element, null, 100, 'code')($scope);
      }
    }
  };
});