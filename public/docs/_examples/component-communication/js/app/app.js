(function(app) {
  app.AppComponent = AppComponent
  
  function AppComponent() {}
  
  AppComponent.annotations = [
    new ng.core.Component({
      selector: 'my-app',
      template: '<h1 class="title"><a href=".">Component Communication</a></h1>' 
        + '<div class="links">' + app.LINKS.join(' ') + '</div>'
        + '<router-outlet></router-outlet>',
      directives: [ng.router.ROUTER_DIRECTIVES]
    }),
    new ng.router.RouteConfig(app.ROUTES)
  ];
})(window.app || (window.app = {}));
