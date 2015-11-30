import {Injectable, EventEmitter} from 'angular2/angular2';
import {Hero} from '../hero';

@Injectable()
export class JobService {
  private _jobRequest: string;
  private _respondingHeroes: Hero[];
  private _jobPostEvent = new EventEmitter<string>();
  
  getJobRequest() { 
    return this._jobRequest
  };

  getRespondingHeroes() {
    return this._respondingHeroes.slice();
  }

  getJobPostEvent() {
    return this._jobPostEvent;
  }
  
  post(jobRequest: string) {
    this._jobRequest = jobRequest;
    this._respondingHeroes = [];
    this._jobPostEvent.next(jobRequest);
  }
    
  take(hero: Hero) {
    this._respondingHeroes.push(hero);
  }
}