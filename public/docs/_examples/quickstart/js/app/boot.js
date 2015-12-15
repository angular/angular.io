// #docregion
(function(app) {
  document.addEventListener('DOMContentLoaded', function() {
    // #docregion import
    ng.platform.browser.bootstrap(app.AppComponent);
    // #enddocregion import
  });
})(window.app || (window.app = {}));
