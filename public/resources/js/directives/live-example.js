/*
* Angular.io Live Example Directive
*
* Renders a link to a live/host example of the doc chapter
* app this directive is contained in.
* 
* Usage:
*   <live-example [name="..."] [noSource] [srcText="..."]>text</live-example>
* Example:
*   <p>Run <live-example name="toh-1">this chapter's example</live-example></p>.
*/

angularIO.directive('liveExample', ['$location', function ($location) {

  function a(text, attrs) {
    var attr = (attrs.href ? ' href="' + attrs.href + '"' : '') +
      (attrs.target ? ' target="' + attrs.target + '"' : '');
    return '<a' + attr +  '>' + text + '</a>';
  }

  function span(text) { return '<span>' + text + '</span>'; }

  return {
    restrict: 'E',

    compile: function (tElement, attrs) {
      var text = tElement.text() || 'live example';
      var ex = attrs.name || NgIoUtil.getExampleName($location);
      var href, template;

      var isForDart = attrs.lang === 'dart' || NgIoUtil.isDartDoc($location);
      var href = isForDart
        ? 'http://angular-examples.github.io/' + ex
        : '/resources/live-examples/' + ex + '/ts/plnkr.html';

      // Link to live example.
      var template = a(text, { href: href, target: '_blank' });

      // The hosted example and sources are in different locations for Dart.
      // Also show link to sources for Dart, unless noSource is specified.
      if (isForDart && !attrs.hasOwnProperty('nosource')) {
        var srcText = attrs.srcText || 'view source';
        var srcHref = 'http://github.com/angular-examples/' + ex;
        template = span(template + ' (' + a(srcText, { href: srcHref, target: '_blank' }) + ')');
      }

      // UPDATE ELEMENT WITH NEW TEMPLATE
      tElement.html(template);

      // RETURN ELEMENT
      return function (scope, element, attrs) { };
    }
  };
}]);
