/**
* Angular.io Live Example Directive
*
* Renders a link to a live/host example of the doc chapter
* app this directive is contained in.
*
* Usage:
*   <live-example [name="..."] [plnkr='...'] [noSource] [srcText="..."]>text</live-example>
* Example:
*   <p>Run <live-example>Try the live example</live-example></p>.
*   // ~/resources/live-examples/{chapter}/ts/plnkr.html
*
*   <p>Run <live-example name="toh-1">this example</live-example></p>.
*   // ~/resources/live-examples/toh-1/ts/minimal.plnkr.html
*
*   <p>Run <live-example plnkr="minimal"></live-example></p>.
*   // ~/resources/live-examples/{chapter}/ts/minimal.plnkr.html
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
      var plnkr = attrs.plnkr || '';
      var href, template;

      var isForDart = attrs.lang === 'dart' || NgIoUtil.isDoc($location, 'dart');
      var isForJs = attrs.lang === 'js' || NgIoUtil.isDoc($location, 'js');
      var exLang = isForDart ? 'dart' : isForJs ? 'js' : 'ts';
      var href = isForDart
        ? 'http://angular-examples.github.io/' + ex
        : '/resources/live-examples/' + ex + '/' + exLang + '/plnkr.html';

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
