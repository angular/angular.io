import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {Hero} from '../hero';
import {JobService} from './job-service';
import {MessageBus} from './message-bus';

@Component({
  selector: 'hero-panel',
  template: `
    <div class='hero-panel'>
      <h3>{{hero.name}}</h3>
      <h4 class=job-request
        [class.announced]="request"
        [class.undertaken]="undertaken">
        {{request || 'No job announced'}}
      </h4>
    <h3 *ngIf="winner"
      [class.won] ="undertaken && winner==hero"
      [class.lost]="undertaken && winner!=hero"
      [class.else]="!undertaken">
      {{finalState}}
    </h3>
      <button
        [disabled]="!request || undertaken"
        [hidden]="winner"
        (click)="takeJob()">
          I'll take it!
      </button>
    </div>
  `,
  styleUrls: ['app/hero-panel.css']
})
export class HeroPanel {
    @Input() hero: Hero;
    request: string = null;
    undertaken: boolean;
    
    constructor(
      private jobService: JobService,
      private messageBus: MessageBus) {
      
      jobService.jobAnnounced.subscribe(
        (job: string) =>
          this.request = job
      )
      jobService.jobAssigned.subscribe(
        (hero: Hero) => {
          this.winner = hero
          if (this.hero == hero) {
            this.messageBus.broadcastMessage(
              '*** I, ' + this.hero.name + ', won the job!');
          }
        }
      )
    }
    
    get winner() {
      return this.jobService.winner;
    }

    takeJob() {
      this.jobService.takeJob(this.hero);
      this.undertaken = true;
      this.messageBus.broadcastMessage(
        '*** I, ' + this.hero.name + ', proudly undertake the job!');
    }
    
    get finalState() {
      return this.winner == this.hero ?
        "I won the job !!!" :
        (this.undertaken ? "I lost the job :-(" : "Job taken.");
  }
}