// #docregion
import { CanActivate }    from '@angular/router';

export class AuthGuard implements CanActivate {
  canActivate() {
    console.log('AuthGuard#canActivate called');
    return true;
  }
}
