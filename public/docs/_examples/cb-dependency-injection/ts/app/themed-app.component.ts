import {Component} from 'angular2/core'
import {LoginService} from './login.service';
import {ThemedRectangleComponent} from './themed-rectangle.component';

@Component({
  selector: 'my-themed-app',
  templateUrl: 'app/themed-app-template.html',
  directives: [ThemedRectangleComponent],
  providers: [LoginService]
})
export class ThemedAppComponent {
  constructor(private loginService: LoginService) {}
  
  login(theme: string) {
    this.loginService.login(theme);
  }
  
  logout() {
    this.loginService.logout();
  }
  
  isLoggedIn() {
    return !!this.loginService.userTheme;
  }
}