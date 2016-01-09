import {RouteDefinition} from 'angular2/router';

import {HeroJobBoard as InviteHero}       from './invite-heroes/hero-job-board';
import {HeroJobBoard as SendJobRequest}   from './send-job-request/hero-job-board';
import {HeroJobBoard as LogJobRequest}    from './log-job-request/hero-job-board';
import {HeroJobBoard as TakeJobEvent}     from './take-job-event/hero-job-board';
import {HeroJobBoard as AssignJob}        from './assign-job/hero-job-board';

export const ROUTES:RouteDefinition[] = [
  {path: '/invite-heroes',            name: 'Invite',                      component: InviteHero, useAsDefault: true},
  {path: '/send-job-request',         name: 'Send Job Request',            component: SendJobRequest},
  {path: '/log-job-request',          name: 'Log Job Request',             component: LogJobRequest},
  {path: '/take-job-event',           name: 'Take Job',                    component: TakeJobEvent},
  {path: '/assign-job',               name: 'Assign Job',                  component: AssignJob}
];

export const LINKS = ROUTES.map((r:RouteDefinition) =>
  r.name ? `<a [routerLink]="['${r.name}']">${r.name}</a>` : '');