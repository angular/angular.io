// #docregion
import { Injectable } from '@angular/core';

@Injectable()
/** Dummy version of an authenticated user service */
export class UserService {
  user = 'Sam Spade';
}
