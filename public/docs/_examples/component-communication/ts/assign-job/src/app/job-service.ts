// #docregion
import {Injectable, EventEmitter} from 'angular2/angular2';
import {Hero} from './hero';

@Injectable()
export class JobService {
    private _jobRequest: string;
    private _respondingHeroes: Hero[];
    private _assignedTo: Hero;
    
    get jobRequest() { 
        return this._jobRequest
    };
    get respondingHeroes() {
        return this._respondingHeroes;
    }
    
    get assignedTo() {
        return this._assignedTo;
    }
    
    jobPostEvent = new EventEmitter<string>();
    jobAssignedEvent = new EventEmitter<Hero>();
    
    post(jobRequest: string) {
        this._jobRequest = jobRequest;
        this._respondingHeroes = [];
        this._assignedTo = null;
        this.jobPostEvent.next(jobRequest);
    }
    
    take(hero: Hero) {
        this._respondingHeroes.push(hero);
    }
    
    assign(hero: Hero) {
        this._assignedTo = hero;
        this.jobAssignedEvent.next(hero);
    }
}
// #enddocregion