(function(app) {
  app.ROUTES = [
    {path: '/invite-heroes', name: 'Invite', component: app.sampleRoots.InviteHero, useAsDefault: true},
    {path: '/send-job-request', name: 'Send Job Request',  component: app.sampleRoots.SendJobRequest},
    {path: '/log-job-request', name: 'Log Job Request',  component: app.sampleRoots.LogJobRequest},
    {path: '/take-job-event', name: 'Take Job', component: app.sampleRoots.TakeJobEvent},
    {path: '/assign-job', name: 'Assign Job', component: app.sampleRoots.AssignJob},
  ];
  
  app.LINKS = app.ROUTES.map(r =>
    r.name ? `<a [routerLink]="['${r.name}']">${r.name}</a>` : '');
})(window.app || (window.app = {}));
