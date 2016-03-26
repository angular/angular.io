// #docregion
import {UserService}   from './user.service';
import {Injectable}    from 'angular2/core';
import {LoggerService} from './logger.service';

@Injectable()
export class UserContext{
  
  name:string;
  role:string;
  loggedInSince:Date;
  
  constructor(private _userService:UserService, private _loggerService:LoggerService){
    this.loggedInSince = new Date();
  }
  
  loadUser(userId:number){
    let user = this._userService.getUserById(userId);
    this.name = user.name;
    this.role = user.role; 
    
    this._loggerService.logDebug('loaded User');
  }
}