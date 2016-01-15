(function(app) {
  var appMetaData = ng.core
    .Component({
      selector: 'my-app',
      template: `
        <h1 class="title"><a href=".">Component Communication</a></h1>
        <div class="links">${app.LINKS.join(' ')}</div>
        <router-outlet></router-outlet>
      `,
      directives: [ng.router.ROUTER_DIRECTIVES]
    });
  var routeConfig = new ng.router.RouteConfig(app.ROUTES);
  appMetaData.annotations.push(routeConfig)
  app.AppComponent = appMetaData
    .Class({
      constructor: function() {},
    })
  app.scenarios = {};
})(window.app || (window.app = {}));
