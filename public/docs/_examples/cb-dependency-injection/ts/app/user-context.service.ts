// #docplaster
// #docregion
import {Injectable}    from 'angular2/core';
import {LoggerService} from './logger.service';
import {UserService}   from './user.service';

// #docregion injectables, injectable
@Injectable()
export class UserContextService {
// #enddocregion injectables, injectable
  name:string;
  role:string;
  loggedInSince:Date;

  // #docregion ctor, injectables
  constructor(private _userService:UserService, private _loggerService:LoggerService){
   // #enddocregion ctor, injectables
    this.loggedInSince = new Date();
   // #docregion ctor, injectables
  }
  // #enddocregion ctor, injectables

  loadUser(userId:number){
    let user = this._userService.getUserById(userId);
    this.name = user.name;
    this.role = user.role;

    this._loggerService.logDebug('loaded User');
  }
// #docregion injectables, injectable
}
// #enddocregion injectables, injectable
