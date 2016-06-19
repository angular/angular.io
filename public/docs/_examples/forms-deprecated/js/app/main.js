// #docregion
(function(app) {
  document.addEventListener('DOMContentLoaded', function() {
    ng.platformBrowserDynamic.bootstrap(app.AppComponent);
  });
})(window.app || (window.app = {}));
