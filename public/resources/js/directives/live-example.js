/**
* Angular.io Live Example Directive
*
* Renders a link to a live/host example of the doc page
* app this directive is contained in.
*
* Usage:
*   <live-example
*      [name="..."]
*      [plnkr='...']
*      [noSource]
*      [embedded]
*      [embedded-style | flat-style]
*      [srcText="..."]
*      [title="..."]>text</live-example>
* Example:
*   <p>Run <live-example>Try the live example</live-example></p>.
*   // ~/resources/live-examples/{page}/ts/plnkr.html
*
*   <p>Run <live-example name="toh-1">this example</live-example></p>.
*   // ~/resources/live-examples/toh-1/ts/plnkr.html
*
*   // Link to the default plunker in the toh-1 sample
*   // The title overrides default ("live example") with "Tour of Heroes - Part 1"
*   <p>Run <live-example name="toh-1" title="Tour of Heroes - Part 1"></live-example></p>.
*   // ~/resources/live-examples/toh-1/ts/plnkr.html
*
*   <p>Run <live-example plnkr="minimal"></live-example></p>.
*   // ~/resources/live-examples/{page}/ts/minimal.plnkr.html
*
*   // Embed the current page's default plunker
*   // Text within tag is "live example"
*   // No title (no tooltip)
*   <live-example embedded title=""></live-example>
*   // ~/resources/live-examples/{page}/ts/eplnkr.html
*
*   // Links to a *new* tab as an embedded style plunker editor
*   <live-example embedded-style>this example</live-example>
*   // ~/resources/live-examples/{page}//ts/eplnkr.html
*
*   // Links to a *new* tab in the flat (original editor) style plunker editor
*   <live-example flat-style>this example</live-example>
*   // ~/resources/live-examples/{page}//ts/eplnkr.html
*
*   // Displays in *same* tab as an embedded style plunker editor
*   <live-example name="toh-1" embedded plnkr="minimal" img="toh>Tour of Heroes - Part 1</live-example>
*   // ~/resources/live-examples/toh-1/ts/minimal.eplnkr.html
*/
angularIO.directive('liveExample', ['$location', function ($location) {

  function a(text, attrs) {
    var attr = (attrs.href ? ' href="' + attrs.href + '"' : '') +
      (attrs.target ? ' target="' + attrs.target + '"' : '');
    return '<a' + attr +  '>' + text + '</a>';
  }

  function span(text) { return '<span>' + text + '</span>'; }

  function embeddedTemplate(src, img, zipHref) {
    return '<div ng-if="embeddedShow">' +
        '<iframe frameborder="0" width="100%" height="100%" src="' + src + '"></iframe>' +
      '</div>' +
      '<img ng-click="toggleEmbedded()" ng-if="!embeddedShow" src="' + img + '" alt="plunker">' +
      '<p>You can also <a href="' + zipHref +'">download this example.</p>';
  }

  return {
    restrict: 'E',
    scope: true,
    compile: function (tElement, attrs) {
      var href, template;
      var text = tElement.text() || 'live example';
      if (attrs['title'] == undefined) { tElement[0].setAttribute('title', text); } // set default title (tooltip)
      var ex = attrs.name || NgIoUtil.getExampleName($location);
      var embedded = attrs.hasOwnProperty('embedded');
      var noDownload = attrs.hasOwnProperty('nodownload') || attrs.hasOwnProperty('noDownload');
      var flatStyle = attrs.hasOwnProperty('flatstyle') || attrs.hasOwnProperty('flatStyle');
      var embeddedStyle = embedded || attrs.hasOwnProperty('embeddedstyle') || attrs.hasOwnProperty('embeddedStyle');
      var plnkr = (embeddedStyle || !flatStyle) ? 'eplnkr' : 'plnkr';
      var zipHref = ex;
      var imageBase  = '/resources/images/';
      var defaultImg = 'plunker/placeholder.png';

      if (attrs.plnkr) {
        plnkr = attrs.plnkr + '.' + plnkr;
        zipHref = attrs.plnkr + '.' + zipHref;
      }

      var isForDart = attrs.lang === 'dart' || NgIoUtil.isDoc($location, 'dart');
      var isForJs = attrs.lang === 'js' || NgIoUtil.isDoc($location, 'js');
      var exLang = isForDart ? 'dart' : isForJs ? 'js' : 'ts';

      zipHref = '/resources/zips/' + ex + '/' + zipHref + '.zip';

      if (embedded && !isForDart) {
        href = '/resources/live-examples/' + ex + '/' + exLang + '/' + plnkr + '.html';
        img = imageBase + (attrs.img || defaultImg);
        template = embeddedTemplate(href, img, zipHref);
      } else {
        var href = isForDart
          ? 'http://angular-examples.github.io/' + ex
          : '/resources/live-examples/' + ex + '/' + exLang + '/' + plnkr + '.html'

        // Link to live example.
        var template = a(text, { href: href, target: '_blank' });

        if (!noDownload) {
          template += ' / ' + a('downloadable example', { href: zipHref, target: '_blank' });
        }

        // The hosted example and sources are in different locations for Dart.
        // Also show link to sources for Dart, unless noSource is specified.
        if (isForDart && !attrs.hasOwnProperty('nosource')) {
          var srcText = attrs.srcText || 'view source';
          var srcHref = 'http://github.com/angular-examples/' + ex;
          template = span(template + ' (' + a(srcText, { href: srcHref, target: '_blank' }) + ')');
        }
      }

      // UPDATE ELEMENT WITH NEW TEMPLATE
      tElement.html(template);

      // RETURN ELEMENT
      return function (scope, element, attrs) {
        scope.toggleEmbedded = function() {
          scope.embeddedShow = !scope.embeddedShow;
        }
      };
    }
  };
}]);
