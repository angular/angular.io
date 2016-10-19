// #docregion
import { NgModule }       from '@angular/core';
import { RouterModule }   from '@angular/router';
import { AuthGuard }      from './auth-guard.service';
import { AuthService }    from './auth.service';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'login', component: LoginComponent }
    ])
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuard,
    AuthService
  ]
})
export class LoginRoutingModule {}
