/*
* Code Pane Directive
*
* @requires codeTab Directive
*
* Individual panes displayed in the
* codeTab elements
*/

angularIO.directive('codePane', function() {
  return {
    require: '^codeTabs',
    restrict: 'E',
    scope: true,

    compile: function(tElement, tAttrs) {
      var html = (tAttrs.escape === "html") ? _.escape(tElement.html()) : tElement.html();
      var template =
        '<copy-container ng-show="selected">' +
          '<pre class="prettyprint ' + tAttrs.format + ' lang-' + tAttrs.language + '">' +
          '<code class="animated fadeIn" ng-non-bindable>' + html + '</code>' +
          '</pre>' +
        '</copy-container>';

      // UPDATE ELEMENT WITH NEW TEMPLATE
      tElement.html(template);


      // RETURN LINK METHOD
      return function(scope, element, attrs, controller) {
        scope.name = attrs.name;

        // ADD PANE TO CONTROLLER
        controller.addPane(scope);
      };
    }
  };
});
