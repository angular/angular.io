/*
* Code Pane Directive
*
* @requires codeTab Directive
*
* Invidiual panes displayed in the the
* codeTab elements
*/

angularIO.directive('codePane', function() {
  return {
    require: '^codeTabs',
    restrict: 'E',
    transclude: true,
    replace: true,
    scope: {
      name: '@',
      language: '@',
      format: '@'
    },

    link: function(scope, element, attrs, codeTabController, transcludeFunc) {
      transcludeFunc( scope, function( content ) {
        var code = '<code ng-non-bindable>' + content[0].innerHTML + '</code>';
        element.append(code);
      });

      codeTabController.addPane(scope);
    },

    template:'<pre class="prettyprint {{format}} lang-{{language}}" ng-show="selected"></pre>'
  };
});