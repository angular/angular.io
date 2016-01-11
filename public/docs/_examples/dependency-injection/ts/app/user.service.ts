// #docregion
import {Injectable} from 'angular2/core';

@Injectable()
export class UserService {
  // Todo: get the user; don't 'new' it.
  private _alice = new User('Alice', true);
  private _bob = new User('Bob', false);

  // initial user is Bob
  user = this._bob;

  // swaps users
  getNewUser() {
    return this.user = this.user === this._bob ? this._alice : this._bob;
  }
}

export class User {
  constructor(
    public name:string,
    public isAuthorized:boolean = false) { }
}
