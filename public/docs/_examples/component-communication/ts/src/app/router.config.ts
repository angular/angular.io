import {RouteDefinition} from 'angular2/router';

import {HeroJobBoard as ComponentHierarchy} from './component-hierarchy/hero-job-board';
import {HeroJobBoard as InviteHeroes} from './invite-heroes/hero-job-board';
import {HeroJobBoard as SendJobRequest} from './send-job-request/hero-job-board';
import {HeroJobBoard as TakeJobBad} from './take-job-antipattern/hero-job-board';
import {HeroJobBoard as TakeJobEvent} from './take-job-event/hero-job-board';
import {HeroJobBoard as JobService} from './job-service/hero-job-board';
import {HeroJobBoard as AssignJob} from './assign-job/hero-job-board';

export const ROUTES:RouteDefinition[] = [
  {path: '/component-hierarchy', name: 'Component Hierarchy', component: ComponentHierarchy},
  {path: '/invite-heroes', name: 'Invite Heroes', component: InviteHeroes},
  {path: '/send-job-request', name: 'Send Job Request', component: SendJobRequest},
  {path: '/take-job-antipattern', name: 'Take Job (Bad)', component: TakeJobBad},
  {path: '/take-job-event', name: 'Take Job Event', component: TakeJobEvent},
  {path: '/job-service', name: 'Job Service', component: JobService},
  {path: '/assign-job', name: 'Assign Job', component: AssignJob},
  {path: '/',  redirectTo: '/component-hierarchy'}
];

// Build router links array from route names
// Ex: <a [router-link]="['Assign Job']">Assign Job</a>
export const LINKS = ROUTES.map((r:RouteDefinition) =>
  r.name ? `<a [router-link]="['${r.name}']">${r.name}</a>` : '');