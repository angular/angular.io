/**
* Angular.io Live Example Directive
*
* Renders a link to a live/host example of the doc chapter
* app this directive is contained in.
*
* Usage:
*   <live-example [name="..."] [plnkr='...'] [noSource] [embedded] [srcText="..."]>text</live-example>
* Example:
*   <p>Run <live-example>Try the live example</live-example></p>.
*   // ~/resources/live-examples/{chapter}/ts/plnkr.html
*
*   <p>Run <live-example name="toh-1">this example</live-example></p>.
*   // ~/resources/live-examples/toh-1/ts/minimal.plnkr.html
*
*   <p>Run <live-example plnkr="minimal"></live-example></p>.
*   // ~/resources/live-examples/{chapter}/ts/minimal.plnkr.html
*
*   <live-example embedded></live-example>
*   // ~/resources/live-examples/{chapter}/ts/eplnkr.html
*
*   <live-example embedded plnkr="minimal"></live-example>
*   // ~/resources/live-examples/{chapter}/ts/minimal.eplnkr.html
*
*   <live-example api="core/animation/ts/dsl"></live-example>
*   // ~/resources/api-live-examples/core/animation/ts/dsl/plnkr.html
*
*   <live-example api="core/animation/ts/dsl" embedded></live-example>
*   // ~/resources/api-live-examples/core/animation/ts/dsl/eplnkr.html
*
*   <live-example api="core/animation/ts/dsl" noimg></live-example>
*   // ~/resources/api-live-examples/core/animation/ts/dsl/plnkr.html
*/
angularIO.directive('liveExample', ['$location', function ($location) {

  function a(text, attrs) {
    var attr = (attrs.href ? ' href="' + attrs.href + '"' : '') +
      (attrs.target ? ' target="' + attrs.target + '"' : '');
    return '<a' + attr +  '>' + text + '</a>';
  }

  function embeddedNoImgTemplate(src) {
    return '<div ng-if="embeddedShow">' +
        '<div class="api-live-example" ng-click="toggleEmbedded()" ng-if="embeddedShow">' +
          '<img src="/resources/images/icons/ic_keyboard_arrow_down_black_24px.svg"><span>Live example</span>' +
        '</div>' +
        '<iframe frameborder="0" width="100%" height="100%" src="' + src + '"></iframe>' +
      '</div>' +
      '<div class="api-live-example" ng-click="toggleEmbedded()" ng-if="!embeddedShow">' +
        '<img src="/resources/images/icons/ic_keyboard_arrow_right_black_24px.svg"><span>Live example</span>' +
      '</div>'

  }

  function embeddedTemplate(src, img) {
    return '<div ng-if="embeddedShow">' +
        '<iframe frameborder="0" width="100%" height="100%" src="' + src + '"></iframe>' +
      '</div>' +
      '<img ng-click="toggleEmbedded()" ng-if="!embeddedShow" src="' + img + '" alt="plunker">';
  }

  function getHref(langOrApi, example, plnkr) {
    var href;
    switch (langOrApi) {
      case 'ts':
      case 'js':
        href = '/resources/live-examples/' + example + '/' + langOrApi + '/' + plnkr + '.html';
        break;
      case 'dart':
        href = 'http://angular-examples.github.io/' + example;
        break;
      case 'api':
        href = '/resources/api-live-examples/' + example + '/' + plnkr + '.html';
    }
    return href;
  }

  function span(text) { return '<span>' + text + '</span>'; }

  return {
    restrict: 'E',
    scope: true,
    compile: function (tElement, attrs) {
      var text = tElement.text() || 'live example';
      var ex = attrs.name || NgIoUtil.getExampleName($location);
      var embedded = attrs.hasOwnProperty('embedded');
      var plnkr = embedded ? 'eplnkr' : 'plnkr';
      var href, template, exLang;
      var imageBase  = '/resources/images/';
      var defaultImg = 'plunker/placeholder.png';
      var noImg = angular.isDefined(attrs.noimg);
      var isApi = !!attrs.api;
      console.log(noImg);
      if (attrs.plnkr) {
        plnkr = attrs.plnkr + '.' + plnkr;
      }

      if (isApi) {
        ex = attrs.api;
        exLang = 'api';
      } else {
        exLang = isForDart ? 'dart' : isForJs ? 'js' : 'ts';
      }

      var isForDart = attrs.lang === 'dart' || NgIoUtil.isDoc($location, 'dart');
      var isForJs = attrs.lang === 'js' || NgIoUtil.isDoc($location, 'js');

      if (embedded && !isForDart) {
        href = getHref(exLang, ex, plnkr);
        img = imageBase + (attrs.img || defaultImg);
        template = noImg ? embeddedNoImgTemplate(href) : embeddedTemplate(href, img);
      } else {
        href = getHref(exLang, ex, plnkr);

        // Link to live example.
        template = a(text, { href: href, target: '_blank' });

        // The hosted example and sources are in different locations for Dart.
        // Also show link to sources for Dart, unless noSource is specified.
        if (isForDart && !attrs.hasOwnProperty('nosource')) {
          var srcText = attrs.srcText || 'view source';
          href = getHref('dart', ex);
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
