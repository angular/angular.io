import {Component, Input, Output, EventEmitter, CORE_DIRECTIVES} from 'angular2/angular2';
import {Hero} from './hero';
import {HeroJobBoard} from './hero-job-board';
import {JobService} from './job-service';
import {MessageBus} from './message-bus';

@Component({
    selector: 'invited-hero',
    template: `
        <div class='invited-hero'>
            <h3 class='hero-name'>Job Request for {{hero.name}}</h4>
            <h4 class=job-request
                [class.announced]='request'
                [class.undertaken]='undertaken'>
                {{getRequest()}}
            </h4>
            <h2 *ng-if='winner'
                [class.won]='undertaken && winner==hero'
                [class.lost]='undertaken && winner!=hero'
                [class.else]='!undertaken'>
                {{finalState}}
            </h2>
            <button [disabled]="!request || undertaken"
                [hidden]='winner'
                (click)='undertakeJob()'>
                I'll take it!
            </button>
            <button [hidden]="!winner || winner == hero"
                (click)='stealJob()'>
                I steal the job!
            </button>
        </div>
    `,
    styles: [`
        .invited-hero {
          margin: 8px;
          border: 2px solid grey;
          box-sizing: border-box;
          padding: 0px 8px 16px 8px;
        }
        .hero-name {
            text-align: center;
        }
        .job-request {
            color: gray;
            border: 1px solid lightgray;
            padding: 4px;
            background-color: #dddddd;
        }
        .announced {
            color: red;
            border: 2px solid red;
            background-color: #ffdddd;
        }
        .undertaken {
            color: blue;
            border: 2px solid blue;
            background-color: #ddddff;
        }
        .won {
            color: white;
            border: 2px solid green;
            background-color: green;
            padding: 8px;
        }
        .lost {
            color: white;
            border: 2px solid gray;
            background-color: gray;
            padding: 8px;
        }
        .else {
            color: gray;
            border: 2px solid gray;
            background-color: #dddddd;
            padding: 8px;
        }
    `],
    directives: [CORE_DIRECTIVES]
})
export class InvitedHero {
    @Input() hero: Hero;
    request: string;
    undertaken: boolean;
    winner: Hero;
    
    constructor(private jobService: JobService,
        private messageBus: MessageBus) {
        jobService.jobPostEvent.subscribe(
            request => {
                this.request = request;
                this.undertaken = false;
                this.winner = null; 
            });
        jobService.jobAssignedEvent.subscribe(
            winner => {
                this.winner = winner;
            });
    }
    
    getRequest() {
        return this.request
          ? this.request : "No job announced";
    }
    
    undertakeJob() {
        this.jobService.take(this.hero);
        this.undertaken = true;
        this.messageBus.broadcastMessage('*** I, ' + this.hero.name
            + ', proudly undertake the job!')
    }
    
    get finalState() {
        if (!this.winner) return "No winner announced yet."
        if (!this.undertaken) return "Job taken."
        return this.winner == this.hero
            ? "I won the job !!!"
            : "I lost the job :-(";
    }
    
    stealJob() {
        this.undertaken = true;
        this.jobService.assign(this.hero);
        this.messageBus.broadcastMessage('*** I, ' + this.hero.name
            + ', stole the job... Hahaha...');
    }
}