// #docregion
import {Injectable} from 'angular2/core';

@Injectable()
export class UserService {

  getUserById(userId:number):any{
    return {name:'Bombasto',role:'Admin'};
  }
}