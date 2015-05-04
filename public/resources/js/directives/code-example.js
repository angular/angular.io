/*
* Code Example Directive
*
* Formats codes examples and prevents
* Angular code from being processed.
*/

angularIO.directive('codeExample', function() {
  return {
    restrict: 'E',

    compile: function(tElement, tAttrs) {
      var html = (tAttrs.escape === "html") ? _.escape(tElement.html()) : tElement.html();
      var template =  '<pre class="prettyprint {{format}} lang-{{language}}">' +
                      '<code ng-non-bindable>' + html + '</code>' +
                      '</pre>';

      // UPDATE ELEMENT WITH NEW TEMPLATE
      tElement.html(template);

      // RETURN ELEMENT
      return function(scope, element, attrs) {
        // SET SCOPE MANUALLY
        scope.language = attrs.language;
        scope.format = attrs.format;
      };
    }
  };
});