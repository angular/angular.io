import {Injectable} from '@angular/core';

@Injectable()
export class UserService {
  // Dummy version has fixed values
  private _userName = 'Sam Spade';
  private _userId = 100;
  private _roles = ['admin'];

  get userName() { return this._userName; }
  get userId() { return this._userId; }

  hasRole(role: string) {
    return this._roles.includes(role);
  }
}
