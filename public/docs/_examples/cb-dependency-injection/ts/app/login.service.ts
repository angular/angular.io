// #docregion
import {Injectable} from 'angular2/core';

@Injectable()
export class LoginService {
  private _userTheme: string;
  
  login(withTheme: string) {
    this._userTheme = withTheme;
  }
  
  logout() {
    this._userTheme = null;
  }
  
  get userTheme() {
    return this._userTheme;
  }
}
// #enddocregion
