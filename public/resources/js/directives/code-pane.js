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
    scope: true,

    compile: function(tElement, tAttrs) {
      var html = (tAttrs.escape === "html") ? _.escape(tElement.html()) : tElement.html();
      var template =  '<pre class="prettyprint ' + tAttrs.format + ' lang-' + tAttrs.language + '" ng-show="selected">' +
                      '<code ng-non-bindable>' + html + '</code>' +
                      '</pre>';


      // UPDATE ELEMENT WITH NEW TEMPLATE
      tElement.html(template);


      // RETURN LINK METHOD
      return function(scope, element, attrs, controller) {
        scope.name = attrs.name;

        //ADD PANE TO CONTROLLER
        controller.addPane(scope);
      };
    }
  };
});