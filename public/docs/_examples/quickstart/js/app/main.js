// #docregion
(function(app) {
  document.addEventListener('DOMContentLoaded', function() {
    // #docregion import
    ng.platformBrowserDynamic.bootstrap(app.AppComponent);
    // #enddocregion import
  });
})(window.app || (window.app = {}));
