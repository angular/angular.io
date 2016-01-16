(function(app) {
  app.ROUTES = [
    {path: '/invite-heroes', name: 'Invite', component: app.scenarioRoots.InviteHero, useAsDefault: true},
    {path: '/send-job-request', name: 'Send Job Request',  component: app.scenarioRoots.SendJobRequest},
    {path: '/log-job-request', name: 'Log Job Request',  component: app.scenarioRoots.LogJobRequest},
    {path: '/take-job-event', name: 'Take Job', component: app.scenarioRoots.TakeJobEvent},
    {path: '/assign-job', name: 'Assign Job', component: app.scenarioRoots.AssignJob}
  ];
  
  app.LINKS = app.ROUTES.map(function(r) {
    return r.name ? '<a [routerLink]="[\'' + r.name + '\']">' + r.name + '</a>' : '';
  })
  
})(window.app || (window.app = {}));
