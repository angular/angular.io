// #docregion
(function(app) {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    ng.platform.browser.bootstrap(app.PhonecatApp, [
      ng.http.HTTP_PROVIDERS,
      ng.router.ROUTER_PROVIDERS,
      ng.router.ROUTER_DIRECTIVES,
      ng.core.provide(ng.router.LocationStrategy, {useClass: ng.router.HashLocationStrategy}),
      app.Phones
    ]);
  });

})(window.app || (window.app = {}));
