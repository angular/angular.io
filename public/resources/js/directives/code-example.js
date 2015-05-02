/*
* Code Example Directive
*
* Formats codes examples and prevents
* Angular code from being processed.
*/

angularIO.directive('codeExample', function() {
  return {
    restrict: 'E',
    transclude: true,
    replace: true,
    scope: {
      name: '@',
      language: '@',
      format: '@'
    },

    link: function(scope, element, attrs, codeSwitchController, transcludeFunc) {
      transcludeFunc( scope, function( content ) {
        var code = '<code ng-non-bindable>' + content[0].innerHTML + '</code>';
        element.append(code);
      });
    },

    template:'<pre class="prettyprint {{format}} lang-{{language}}"></pre>'
  };
});