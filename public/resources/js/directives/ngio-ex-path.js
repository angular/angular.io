/*
* Angular.io Example File Path Directive
*
* Usage:
*   <span ngio-ex [lang="ts|dart"]>some_path</span>
*   <ngio-ex path="some_path" [lang="ts|dart"]></ngio-ex>
*
* The latter gets treated as a block tag in markdown when at the start of a line.
*
* Yields
*   <code>some_path_possibly_adjusted</code>
*
* The given path is assumed to be a TS app directory or
* source file path. When this directive is used in Dart docs
* it adjusts the path to conform to Dart directory and file
* name conventions. See NgIoUtil.adjustTsExamplePathForDart()
* for details.
*/

angularIO.directive('ngioEx', ['$location', function ($location) {
  return {
    restrict: 'AE',

    compile: function (tElement, attrs) {
      var examplePath = attrs.path || tElement.text();
      if (NgIoUtil.isDartDoc($location) || attrs.lang === 'dart') {
        examplePath = NgIoUtil.adjustTsExamplePathForDart(examplePath);
      }
      var template = '<code>' + examplePath + '</code>';

      // UPDATE ELEMENT WITH NEW TEMPLATE
      tElement.html(template);

      // RETURN ELEMENT
      return function (scope, element, attrs) { };
    }
  };
}]);
