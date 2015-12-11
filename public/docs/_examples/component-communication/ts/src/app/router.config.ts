import {RouteDefinition} from 'angular2/router';

import {HeroJobBoard as InviteHero}       from './invite-heroes/hero-job-board';
import {HeroJobBoard as SendJobRequest}   from './send-job-request/hero-job-board';
import {HeroJobBoard as TakeJobEvent}     from './take-job-event/hero-job-board';
import {HeroJobBoard as TakeJobParentRef} from './take-job-parentref/hero-job-board';
import {HeroJobBoard as AssignJob}        from './assign-job/hero-job-board';
import {JobBoardWithMessages}             from './message-board/job-board-with-messages';
import {JobBoardWithContent}              from './take-job-contentchildren/job-board-with-content';

export const ROUTES:RouteDefinition[] = [
  {path: '/invite-heroes',            name: 'Invite',                      component: InviteHero, useAsDefault: true},
  {path: '/send-job-request',         name: 'Send Job Request',            component: SendJobRequest},
  {path: '/take-job-event',           name: 'Take Job (event)',            component: TakeJobEvent},
  {path: '/take-job-parentref',       name: 'Take Job (parent reference)', component: TakeJobParentRef},
  {path: '/assign-job',               name: 'Assign Job (service)',        component: AssignJob},
  {path: '/message-board',            name: 'Message Board',               component: JobBoardWithMessages},
  {path: '/take-job-contentchildren', name: 'Using @ContentChildren',      component: JobBoardWithContent}
];

export const LINKS = ROUTES.map((r:RouteDefinition) =>
  r.name ? `<a [routerLink]="['${r.name}']">${r.name}</a>` : '');