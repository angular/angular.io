import { provideRouter, RouterConfig } from '@angular/router';

import { AppComponent as S0101 } from '../01-01/app';
import { AppComponent as S0207 } from '../02-07/app';
import { AppComponent as S0208 } from '../02-08/app';
import { AppComponent as S0301 } from '../03-01/app';
import { AppComponent as S0302 } from '../03-02/app';
import { AppComponent as S0303 } from '../03-03/app';
import { AppComponent as S0304 } from '../03-04/app';
import { AppComponent as S0305 } from '../03-05/app';
import { AppComponent as S0306 } from '../03-06/app';
import { AppComponent as S0410 } from '../04-10/app';
import { AppComponent as S0414 } from '../04-14/app';
import { AppComponent as S0502 } from '../05-02/app';
import { AppComponent as S0503 } from '../05-03/app';
import { AppComponent as S0504 } from '../05-04/app';
import { AppComponent as S0512 } from '../05-12/app';
import { AppComponent as S0513 } from '../05-13/app';
import { AppComponent as S0514 } from '../05-14/app';
import { AppComponent as S0515 } from '../05-15/app';
import { AppComponent as S0516 } from '../05-16/app';
import { AppComponent as S0517 } from '../05-17/app';
import { AppComponent as S0601 } from '../06-01/app';
import { AppComponent as S0603 } from '../06-03/app';
import { AppComponent as S0701 } from '../07-01/app';
import { AppComponent as S0703 } from '../07-03/app';
import { AppComponent as S0704 } from '../07-04/app';
import { AppComponent as S0901 } from '../09-01/app';

const routes: RouterConfig = [
  { path: '', redirectTo: '/01-01', pathMatch: 'full' },
  { path: '01-01', component: S0101 },
  { path: '02-07', component: S0207 },
  { path: '02-08', component: S0208 },
  { path: '03-01', component: S0301 },
  { path: '03-02', component: S0302 },
  { path: '03-03', component: S0303 },
  { path: '03-04', component: S0304 },
  { path: '03-05', component: S0305 },
  { path: '03-06', component: S0306 },
  { path: '04-10', component: S0410 },
  { path: '04-14', component: S0414 },
  { path: '05-02', component: S0502 },
  { path: '05-03', component: S0503 },
  { path: '05-04', component: S0504 },
  { path: '05-12', component: S0512 },
  { path: '05-13', component: S0513 },
  { path: '05-14', component: S0514 },
  { path: '05-15', component: S0515 },
  { path: '05-16', component: S0516 },
  { path: '05-17', component: S0517 },
  { path: '06-01', component: S0601 },
  { path: '06-03', component: S0603 },
  { path: '07-01', component: S0701 },
  { path: '07-03', component: S0703 },
  { path: '07-04', component: S0704 },
  { path: '09-01', component: S0901 },
];

export const appRouterProviders = [
  provideRouter(routes)
];
