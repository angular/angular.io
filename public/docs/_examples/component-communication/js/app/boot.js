// #docregion
(function(app) {
  document.addEventListener('DOMContentLoaded', function() {
    ng.platform.browser.bootstrap(app.AppComponent, [
        ng.router.ROUTER_PROVIDERS, 
        ng.router.PathLocationStrategy, 
        ng.core.provide(ng.router.APP_BASE_HREF, {useValue: '/'})]);
  });
})(window.app || (window.app = {}));
