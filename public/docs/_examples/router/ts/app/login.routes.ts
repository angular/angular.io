// #docregion
import { RouterConfig }       from '@angular/router';
import { AuthGuard }          from './auth-guard.service';
import { AuthService }        from './auth.service';
import { LoginComponent }     from './login.component';

export const loginRoutes: RouterConfig = [
  { path: 'login', component: LoginComponent }
];

export const authProviders = [AuthGuard, AuthService];
