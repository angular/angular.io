// #docregion service
import {Injectable, provide} from 'angular2/core';
import {LoginService} from './login.service'

@Injectable()
export class ThemedDrawService {
  constructor(private _userTheme: string) {}
  
  get background() {
    return this._userTheme == 'red'
      ? 'red' : 'green';
  }
}

// ... Factory and provider definition 
// #enddocregion service

// #docregion factory
// ... ThemedDrawService class declaration

let themedDrawFactory = 
  (loginService: LoginService) => new ThemedDrawService(loginService.userTheme);

export let themedDrawProvider =  provide(ThemedDrawService, {
  useFactory: themedDrawFactory,
  deps: [LoginService]
})
// #enddocregion factory