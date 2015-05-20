/*
* Code Example Directive
*
* Formats codes examples and prevents
* Angular code from being processed.
*/

angularIO.directive('codeExample', function() {
  return {
    restrict: 'E',

    compile: function(tElement, attrs) {
      var html = (attrs.escape === "html") ? _.escape(tElement.html()) : tElement.html();
      var template =  '<pre class="prettyprint ' + attrs.format + ' lang-' + attrs.language + '">' +
                      '<code ng-non-bindable>' + html + '</code>' +
                      '</pre>';

      // UPDATE ELEMENT WITH NEW TEMPLATE
      tElement.html(template);

      // RETURN ELEMENT
      return function(scope, element, attrs) {};
    }
  };
});