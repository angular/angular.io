// #docregion
(function(app) {
  'use strict';

  app.PhonecatApp = function PhonecatApp() {
  }
  app.PhonecatApp.annotations = [
    new ng.core.ComponentMetadata({
      selector: 'phonecat-app',
      template: '<router-outlet></router-outlet>',
      directives: ng.router.ROUTER_DIRECTIVES
    }),
    new ng.router.RouteConfig([
      {path:'/phones', as: 'Phones', component: app.PhoneList},
      {path:'/phones/:phoneId', as: 'Phone', component: app.PhoneDetail},
      {path:'/', redirectTo: ['/phones']}
    ])
  ];

})(window.app || (window.app = {}));
