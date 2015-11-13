import {Injectable, EventEmitter} from 'angular2/angular2';
import {Hero} from './hero';

@Injectable()
export class JobService {
    private _jobRequest: string;
    private _respondingHeroes: Hero[];
    
    get jobRequest() { 
        return this._jobRequest
    };
    get respondingHeroes() {
        return this._respondingHeroes;
    }
    
    jobPostEvent = new EventEmitter();
    
    post(jobRequest: string) {
        this._jobRequest = jobRequest;
        this._respondingHeroes = [];
        this.jobPostEvent.next(jobRequest);
    }
    
    take(hero: Hero) {
        this._respondingHeroes.push(hero);
    }
}