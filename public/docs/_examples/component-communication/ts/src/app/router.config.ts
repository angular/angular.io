import {RouteDefinition} from 'angular2/router';

import {HeroJobBoard as InviteHero}       from './invite-heroes/hero-job-board';
import {HeroJobBoard as TakeJobEvent}     from './take-job-event/hero-job-board';
import {HeroJobBoard as TakeJobParentRef} from './take-job-parentref/hero-job-board';
import {HeroJobBoard as AssignJob}        from './assign-job/hero-job-board';
import {JobBoardWithMessages}             from './message-board/job-board-with-messages';
import {HeroJobBoard as UsingQuery}       from './using-query/hero-job-board';

export const ROUTES:RouteDefinition[] = [
  {path: '/invite-heroes',      name: 'Invite',                      component: InviteHero},
  {path: '/take-job-event',     name: 'Take Job (event)',            component: TakeJobEvent},
  {path: '/take-job-parentref', name: 'Take Job (parent reference)', component: TakeJobEvent},
  {path: '/assign-job',         name: 'Assign Job',                  component: AssignJob},
  {path: '/message-board',      name: 'Message Board',               component: JobBoardWithMessages},
  {path: '/using-query',        name: 'Using Query',                 component: UsingQuery},
  {path: '/',  redirectTo: '/invite-heroes'}
];

// Build router links array from route names
// Ex: <a [router-link]="['Assign Job']">Assign Job</a>
export const LINKS = ROUTES.map((r:RouteDefinition) =>
  r.name ? `<a [router-link]="['${r.name}']">${r.name}</a>` : '');