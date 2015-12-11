// #docregion
import {Injectable, EventEmitter} from 'angular2/core';
import {Hero} from '../hero';

@Injectable()
export class JobService {
  // Service state
  private _invitedHeroes: Hero[] = [];
  private _request: string;
  private _respondingHeroes: Hero[] = [];
  private _winner: Hero;
  private _jobAnnounced = new EventEmitter<string>();
  private _jobAssigned = new EventEmitter<Hero>();
   
  // HeroJobBoard facade
  get invitedHeroes() {
    return this._invitedHeroes;
  }
  
  get respondingHeroes() {
    return this._respondingHeroes;
  }
  
  inviteHeroes() {
    this._invitedHeroes = Hero.heroes;
    this._respondingHeroes = [];
    this.announceJob(null);
  }
  
  announceJob(request: string) {
    this._request = request;
    this._jobAnnounced.next(request);
  }
  
  assignJob(hero: Hero) {
    this._winner = hero;
    this._jobAssigned.next(hero);
  }
  
  get winner(): Hero {
    return this._winner;
  }
  
  // HeroPanel facade
  get request() {
    return this._request;
  }
  
  get jobAnnounced() {
    return this._jobAnnounced
  }
  
  takeJob(hero: Hero) {
    this._respondingHeroes.push(hero);
  }
  
  get jobAssigned() {
    return this._jobAssigned;
  }
}
// #enddocregion