/**
 * A directive that adds a copy button to a block of text
 * Wrap this directive (as an element) around a block of text that you wish to be
 * copyable.
 * The directive will add a copy button positioned to float in the top right corner
 * of the block of text.
 *
 * This directive is used in the `code-example` and `code-pane` directives.
 *
 * @example
 *
 * ```html
 * <copy-container>
 * <pre>
 *   <code>
 *   SomeBlockOfCode();
 *   </code>
 * </pre>
 * </copy-container>
 * ```
 */
angularIO.directive('copyContainer', function() {
  return {
    restrict: 'E',
    transclude: true,
    template:
      '<div class="copy-container-template">' +
        '<copy-button class="copy-button"></copy-button>' +
        '<ng-transclude></ng-transclude>' +
      '</div>'
  };
});


/**
 * A directive that creates a copy button that will copy the contents of the element that follows
 * it. The element containing the content can contain dynamic content itself (e.g. `<ng-transclude>`)
 * but the content element itself most be available at link time.
 */
angularIO.directive('copyButton', function() {
  var buttonLabel = "Copy Code";

  return {
    restrict: 'E',
    template:
      '<md-button class="md-copy-button">\n' +
      buttonLabel + '\n' +
      '  <md-tooltip>Copy to Clipboard</md-tooltip>\n' +
      '</md-button>',
    link: function link(scope, element) {
      var contentElement = element.next();
      var clipboard = new Clipboard(element[0], {
        text: function() {
          var button = element[0].firstChild;
          var buttonWrapper = element;

          console.log('clicked', contentElement[0].innerText);

          // CHANGE TEXT, THEN CHANGE BACK
          buttonWrapper.addClass('is-copied');
          button.innerText = 'Copied!';
          setTimeout(function() {
            buttonWrapper.removeClass('is-copied');
            button.innerText = buttonLabel;
          }, 1000);

          return contentElement[0].innerText; }
      });
      scope.$on('$destroy', function() {
        clipboard.destroy();
      });
    }
  };
});
